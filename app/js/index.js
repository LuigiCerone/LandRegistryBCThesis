$(function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        // web3js = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // Now you can start your app & access web3 freely:
    startApp()


    $('#addLand').on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/rest/v1/insert",
            data: {
                landParcel: $('#landParcel').val(),
                ownerAddress: $('#ownerAddress').val()
            },
            success: function (res) {
                console.log(res);
            }
        });
    });
});

function startApp() {
    console.log("App started");
}
