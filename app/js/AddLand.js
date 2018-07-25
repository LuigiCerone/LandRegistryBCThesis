import React from "react";
import './AddLand.css';
import Unity from "./Unity";
import web3 from './web3.wrapper';
import {loggerContractAddress, UnityContract, UnityContractByteCode} from './costant';

class AddLand extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        // Bind methods.
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        // TODO Add validation.

        this.insertUnity({
            district: event.target.district.value,
            document: event.target.document.value,
            landParcel: event.target.landParcel.value,
            subaltern: event.target.subaltern.value,
            ownerAddress: event.target.ownerAddress.value,
        });
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
            <form onSubmit={this.onFormSubmit}>
                <h2>Insert new land</h2>

                <input type="text" maxLength="2" placeholder="District" name="district" required/>
                <input type="number" placeholder="Document" name="document" required/>
                <input type="number" placeholder="Land parcel" name="landParcel" required/>
                <input type="number" placeholder="Subaltern" name="subaltern" required/>
                <input type="text" placeholder="Owner address" name="ownerAddress" required/>

                <input type="submit" value="Add land"/>
            </form>
        );
    }
}

export default AddLand;

