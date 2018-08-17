import React from "react";
import "./TransferLand.css";

import Unity from "../../Unity";
import web3 from '../../web3.wrapper';
import {loggerContractAddress, UnityContract, UnityContractByteCode} from '../../costant';
import Modal from '../Modal/Modal';
import UnityAbi from "BuildContracts/Unity";

class TransferLand extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

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

        if (this.state.done) return;

        console.log(event.target);

        this.transfer({
            landId: event.target.landId.value,
            ownerAddress: event.target.ownerAddress.value,
            buyerAddress: event.target.buyerAddress.value,
        }).then(() => {
                this.setState({
                    done: true
                });
                return this.showModal();
            }
        ).catch((err) => console.error(err));

    }

    async transfer({landId, ownerAddress, buyerAddress}) {
        try {
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

            await UnityContract.methods.transferLand(buyerAddress, contractStored[0].contract.land.landParcel).send({
                from: ownerAddress,
                gas: 300000
            });
        } catch (error) {
            console.log("" + error);
        }
    }

    render() {
        return (
            <form onInput={this.resetDone} onSubmit={this.onFormSubmit}>
                <h2>Transfer land</h2>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Land's ownership has been successfully transferred!</p>
                </Modal>

                <input type="number" placeholder="Land ID" name="landId" required/>
                <input type="text" placeholder="Owner address" name="ownerAddress" required/>
                <input type="text" placeholder="Buyer address" name="buyerAddress" required/>

                <input type="submit" value="Transfer"/>
            </form>
        );
    }
}

export default TransferLand;