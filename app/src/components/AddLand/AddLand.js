import React from "react";
import './AddLand.css';
import Unity from "../../model/Unity";
import web3 from '../../utils/web3.wrapper';
import {loggerContractAddress, UnityContract, UnityContractByteCode} from '../../utils/costant';
import Modal from '../Modal/Modal';

class AddLand extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            done: false
        };

        // Bind methods.
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.resetDone = this.resetDone.bind(this);
    }

    showModal() {
        this.setState({show: true});
    };

    hideModal() {
        this.setState({show: false});
    };

    resetDone() {
        this.setState({done: false});
    }

    onFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.done) return;

        // TODO Add validation.

        this.insertUnity({
            district: event.target.district.value,
            document: event.target.document.value,
            landParcel: event.target.landParcel.value,
            subaltern: event.target.subaltern.value,
            ownerAddress: event.target.ownerAddress.value,
        }).then(() => {
                console.log("Show modal");
                this.setState({
                    done: true
                });
                return this.showModal();
            }
        ).catch((err) => console.error(err));
    };

    // district, document, landParcel, subaltern, ownerAddress.
    async insertUnity({district, document, landParcel, subaltern, ownerAddress}) {

        // First we need to create a new unity.
        let newUnity = new Unity(district, document, landParcel, subaltern, ownerAddress);

        // Now I need to insert newUnity into the contract.
        try {
            let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
            console.log("Nonce value is: " + nonce);
            let newContractInstance = await UnityContract.deploy({
                data: UnityContractByteCode,
                // (district, document, landParcel, subaltern, ownerAddress)
                arguments: [loggerContractAddress, web3.utils.asciiToHex(newUnity._district), newUnity._document,
                    newUnity._landParcel, newUnity._subaltern, newUnity._ownerAddress]
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
                        <input type="text" className="form-control" placeholder="Owner address" id="ownerAddress"
                               name="ownerAddress" required/>
                    </div>

                    <input className="btn btn-primary" type="submit" value="Add land"/>
                </form>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>New land has been correctly inserted into the blockchain!</p>
                </Modal>
            </div>
        );
    }
}

export default AddLand;

