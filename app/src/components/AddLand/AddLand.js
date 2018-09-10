import React from "react";
import './AddLand.css';
import Unity from "../../model/Unity";
import DuplicateException from "../../model/DuplicateException";
import web3 from '../../utils/web3.wrapper';
import {loggerContractAddress, UnityContract, UnityContractByteCode} from '../../utils/costant';
import Modal from '../Modal/Modal';

class AddLand extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            done: false,
            error: false,
            error_message: ''
        };

        // Bind methods.
        this.onFormSubmit = this.onFormSubmit.bind(this);
        // For completed modal.
        this.showCompletedModal = this.showCompletedModal.bind(this);
        this.hideCompletedModal = this.hideCompletedModal.bind(this);

        // For error modal.
        this.showErrorModal = this.showErrorModal.bind(this);
        this.hideErrorModal = this.hideErrorModal.bind(this);

        this.resetDone = this.resetDone.bind(this);
    }

    showCompletedModal() {
        this.setState({show: true});
    };

    hideCompletedModal() {
        this.setState({show: false});
    };

    showErrorModal() {
        this.setState({error: true});
    };

    hideErrorModal() {
        this.setState({error: false});
    };

    resetDone() {
        this.setState({done: false});
    }

    onFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.done) return;


        this.insertUnity({
            district: event.target.district.value,
            document: event.target.document.value,
            landParcel: event.target.landParcel.value,
            subaltern: event.target.subaltern.value,
            ownerAddress: event.target.ownerAddress.value,
        }).then(() => {
                // console.log("Show modal");
                this.setState({
                    done: true
                });
                return this.showCompletedModal();
            }
        ).catch((err) => {
            console.error(err);
            if (err.name !== null && err.name === 'DuplicateException') {
                // console.log("Show error modal");
                this.setState({
                    error: true,
                    error_message: err.message[0].contract.land.ownerAddress
                });
                return this.showErrorModal();
            }
        });
    };

    // district, document, landParcel, subaltern, ownerAddress.
    async insertUnity({district, document, landParcel, subaltern, ownerAddress}) {

        // First we need to check if the unity is already stored.
        // We search by using id made of landParcel + subaltern.
        let landId = landParcel + subaltern;
        let landInfo = await this.isDuplicate(landId);
        if (landInfo != null) {
            console.log(landInfo);
            throw new DuplicateException(landInfo);
        } else {
            // We need to create a new unity.
            let newUnity = new Unity(district, document, landParcel, subaltern, ownerAddress);

            // Now I need to insert newUnity into the contract.
            let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
            console.log("Nonce value is: " + nonce);
            let newContractInstance = await UnityContract.deploy({
                data: UnityContractByteCode,
                // (district, document, landParcel, subaltern, ownerAddress)
                arguments: [loggerContractAddress, web3.utils.asciiToHex(newUnity._district), newUnity._document,
                    newUnity._landParcel, newUnity._subaltern, web3.utils.toChecksumAddress(newUnity._ownerAddress)]
            })
                .send({
                    from: web3.eth.defaultAccount,
                    nonce: web3.utils.toHex(nonce),
                    // estimated gas 804653
                    gas: web3.utils.toHex(1200000)
                });
            console.log("New contract address is: " + newContractInstance.options.address);


            // let result = await newContractInstance.methods.insertLand(web3.utils.asciiToHex(newUnity._district), newUnity._document,
            //     newUnity._landParcel, newUnity._subaltern, newUnity._ownerAddress).send({
            //     from: web3.eth.defaultAccount,
            //     nonce: web3.utils.toHex(++nonce),
            //     gas: web3.utils.toHex(300000)
            // });
            // console.log(result);
        }
    }

    async isDuplicate(landId) {
        // We need to query the server in order to check if this unity is already stored.
        try {
            let response = await
                fetch('/rest/v1/getLandById?id=' + landId);
            if (!response.ok) {
                return null;
            } else
                return await response.json();
        } catch (error) {
            console.error("" + error);
        }
    }


    render() {
        return (
            <div>
                <form id="addLandSection" onInput={this.resetDone} onSubmit={this.onFormSubmit}
                      autoComplete="new-password">
                    <h2>Insert new land</h2>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="district">District: </label>
                            <input type="text" className="form-control" maxLength="2" placeholder="District"
                                   id="district"
                                   name="district" required/>
                        </div>

                        <div className="col-md-6 form-group">
                            <label htmlFor="document">Document: </label>
                            <input type="number" className="form-control" placeholder="Document" id="document"
                                   name="document"
                                   required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="landParcel">Land Parcel: </label>
                            <input type="number" className="form-control" placeholder="Land parcel" id="landParcel"
                                   name="landParcel" required/>
                        </div>

                        <div className="col-md-6 form-group">
                            <label htmlFor="subaltern">Subaltern: </label>
                            <input type="number" className="form-control" placeholder="Subaltern" id="subaltern"
                                   name="subaltern" required/>
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="ownerAddress">Owner Address: </label>
                        <input type="text" className="form-control" placeholder="Owner address"
                               id="ownerAddress"
                               name="ownerAddress" required/>
                    </div>

                    <input className="btn btn-secondary" type="submit" value="Add land"/>
                </form>
                <Modal error='false' show={this.state.show} handleClose={this.hideCompletedModal}>
                    <p>New land has been correctly inserted into the blockchain!</p>
                </Modal>

                <Modal error='true' show={this.state.error} handleClose={this.hideErrorModal}>
                    <p>This land id is already assigned to account: {this.state.error_message}</p>
                </Modal>
            </div>
        );
    }
}

export default AddLand;

