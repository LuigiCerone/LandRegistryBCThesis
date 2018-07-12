import Web3 from "web3";
import UnityAbi from "BuildContracts/Unity";

var UnityContract, nonce;

$(function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    window.web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    // Now you can start your app & access web3 freely:
    startApp()


    $('#addLand').on('submit', function (event) {
        event.preventDefault();
        // var encoded = UnityContract.methods.addLand($('#landParcel').val(), $('#ownerAddress').val()).encodeABI();
        //
        // var tx = {
        //     from: $('#ownerAddress').val(),
        //     to: "0xaa36950e6920c396c5c6ae1983293b5205382819",
        //     data: encoded
        // }
        //
        // web3.eth.accounts.signTransaction(tx).then(signed => {
        //     web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log);
        // });

        UnityContract.methods.addLand($('#landParcel').val(), $('#ownerAddress').val()).send({
            from: web3.eth.defaultAccount,
            nonce: nonce,
            gas: 300000
        }).then(console.log);

        // $.ajax({
        //     method: "POST",
        //     url: "http://localhost:3000/rest/v1/insert",
        //     data: {
        //         landParcel: $('#landParcel').val(),
        //         ownerAddress: $('#ownerAddress').val()
        //     },
        //     success: function (res) {
        //         console.log(res);
        //     }
        // });
    });
});

function startApp() {
    console.log("App started");

    UnityContract = new web3.eth.Contract(UnityAbi, Object.values(UnityAbi.networks).pop().address);

    web3.eth.getAccounts().then((accounts) => {
        web3.eth.defaultAccount = accounts[0];
        console.log(web3.eth.defaultAccount);
        web3.eth.getTransactionCount("0x766eeE966A03152Fe0822bEa93289BBefBa87027").then((res) => {
            nonce = (++res);
            console.log(nonce);
        });

    });
}
