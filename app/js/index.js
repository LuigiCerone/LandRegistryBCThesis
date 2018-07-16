import $ from "jquery";
import unityController from "./unityController";

// export for others scripts to use
window.$ = $;

$(function () {

    // Event listeners.

    // Add new land into the contract's storage.
    $('#addLand').on('submit', function (event) {
        event.preventDefault();
        // district, document, landParcel, subaltern, ownerAddress.
        return unityController.insertUnity($('#district').val(), $('#document').val(), $('#landParcel').val(),
            $('#subaltern').val(), $('#ownerAddress').val());
    });

    // Get the history of a land by its id.
    $('#getHistory').on('submit', function (event) {
        event.preventDefault();
        return unityController.getHistory($('#landId').val());
    });

    // Get all lands for a given address.
    $('#getLands').on('submit', function (event) {
        event.preventDefault();
        return unityController.getListOfLands($('#searchAddress').val());
    });

    // Trasfer land from owner address to buyer address.
    $('#transferLand').on('submit', function (event) {
        event.preventDefault();
        return unityController.transfer($('#landParcelTransfer').val(), $('#ownerAddressTransfer').val(), $('#buyerAddress').val());
    });
});
