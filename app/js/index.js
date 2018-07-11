var UnityContract, nonce;

$(function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof  window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

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

    UnityContract = new web3.eth.Contract([
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "__ownedLands",
            "outputs": [
                {
                    "name": "landParcel",
                    "type": "uint256"
                },
                {
                    "name": "ownerAddress",
                    "type": "address"
                },
                {
                    "name": "landID",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "__history",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalLandsCounter",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_landID",
                    "type": "uint256"
                }
            ],
            "name": "Add",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_landID",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_landParcel",
                    "type": "uint256"
                },
                {
                    "name": "_ownerAddress",
                    "type": "address"
                }
            ],
            "name": "addLand",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_landBuyer",
                    "type": "address"
                },
                {
                    "name": "_landParcel",
                    "type": "uint256"
                }
            ],
            "name": "transferLand",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_landHolder",
                    "type": "address"
                },
                {
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "getLand",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_landHolder",
                    "type": "address"
                }
            ],
            "name": "getNoOfLands",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_landId",
                    "type": "uint256"
                }
            ],
            "name": "getHistoryForLand",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ], "0x7a2e7fa9a4ec0f4318bde7759c74274421fb9eb0");
    web3.eth.getAccounts().then((accounts) => {
        web3.eth.defaultAccount = accounts[0];
        console.log(web3.eth.defaultAccount);
        web3.eth.getTransactionCount("0x766eeE966A03152Fe0822bEa93289BBefBa87027").then((res) => {
            nonce = (++res);
            console.log(nonce);
        });

    });
}
