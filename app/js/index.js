import $ from "jquery";
import web3 from "web3.wrapper";
import unityController from "unityController";

import unityDAO from "unityDAO";
// export for others scripts to use
window.$ = $;

$(function () {

    // Now you can start your app & access web3 freely:
    startApp();


    $('#addLand').on('submit', function (event) {
        event.preventDefault();

        return unityController.insertUnity($('#landParcel'), $('#ownerAddress'));
    });
});

function startApp() {
    console.log("App started");


    web3.eth.getAccounts().then((accounts) => {
        web3.eth.defaultAccount = accounts[0];
        console.log(web3.eth.defaultAccount);
        web3.eth.getTransactionCount("0x766eeE966A03152Fe0822bEa93289BBefBa87027").then((res) => {
            nonce = (++res);
            console.log(nonce);
        });

    });
}
