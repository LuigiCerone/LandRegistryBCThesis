import React from "react";
import "./TransferLand.css";

import Unity from "../../model/Unity";
import web3 from '../../utils/web3.wrapper';
import {loggerContractAddress, UnityContract, UnityContractByteCode} from '../../utils/costant';
import Modal from '../Modal/Modal';
import UnityAbi from "BuildContracts/Unity";

class TransferLand extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            done: false,
            show: false
        };
        // For completed modal.
        this.showCompletedModal = this.showCompletedModal.bind(this);
        this.hideCompletedModal = this.hideCompletedModal.bind(this);

        // For error modal.
        this.showErrorModal = this.showErrorModal.bind(this);
        this.hideErrorModal = this.hideErrorModal.bind(this);

        this.resetDone = this.resetDone.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
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

        if (this.state.done) return;

        this.transfer({
            landId: event.target.landId.value,
            ownerAddress: event.target.ownerAddress.value,
            buyerAddress: event.target.buyerAddress.value.toLowerCase(),
        }).then(() => {
                this.setState({
                    done: true
                });
                return this.showCompletedModal();
            }
        ).catch((err) => {
            this.showErrorModal();
            console.error(err);
        });

    }

    async transfer({landId, ownerAddress, buyerAddress}) {
        // (1) get contract address by searching with landId.
        // (2) check owner address.
        // (3) load smart contract somehow.
        // (4) change owner address in smart contract.
        // (5) store the history in the db.

        let response = await fetch('/rest/v1/getLandById?id=' + landId + "&addr=" + ownerAddress);
        let contractStored = await response.json();

        console.log(contractStored);
        let contractAddress = contractStored[0].contract.contractAddress;

        let UnityContract = new web3.eth.Contract(UnityAbi.abi, contractAddress);

        await UnityContract.methods.transferLand(buyerAddress.toLowerCase(), contractStored[0].contract.land.landParcel).send({
            from: ownerAddress,
            gas: 300000
        });

    }

    render() {
        return (
            <div id="transferLandSection">
                <Modal error='false' show={this.state.show} handleClose={this.hideModal}>
                    <p>Land's ownership has been successfully transferred!</p>
                </Modal>
                <Modal error='true' show={this.state.error} handleClose={this.hideErrorModal}>
                    <p>Error</p>
                </Modal>

                <h2>Transfer land</h2>
                <form onInput={this.resetDone} onSubmit={this.onFormSubmit} className="form">
                    <div className="row">
                        <div className="col-md-4 form-group">
                            <label htmlFor="landId">Land id: </label>
                            <input type="number" className="form-control" placeholder="Land id" id="landId"
                                   name="landId" required/>
                        </div>
                        <div className="col-md-8 form-group">
                            <label htmlFor="ownerAddress">Owner Address: </label>
                            <input type="text" className="form-control text-lowercase" placeholder="Owner address"
                                   id="ownerAddress"
                                   name="ownerAddress" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 form-group">
                            <label htmlFor="buyerAddress">Buyer Address: </label>
                            <input type="text" className="form-control text-lowercase" placeholder="Buyer address"
                                   id="buyerAddress"
                                   name="buyerAddress" required/>
                        </div>
                        <div className="col-md-4  form-group input">
                            <input className="btn btn-secondary" type="submit" value="Transfer"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default TransferLand;