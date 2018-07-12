import $ from "jquery";
import unityController from "./unityController";

// export for others scripts to use
window.$ = $;

$(function () {

    // Event listeners.

    // Add new land into the contract's storage.
    $('#addLand').on('submit', function (event) {
        event.preventDefault();
        return unityController.insertUnity($('#landParcel').val(), $('#ownerAddress').val());
    });

    // Get the history of a land by its id.
    $('#getHistory').on('submit', function (event) {
        event.preventDefault();
        return unityController.getHistory($('#landId').val());
    });

    // Get all lands for a given address.
    $('#getLands').on('submit', function (event) {
        event.preventDefault();
        return unityController.getList($('#searchAddress').val());
    });
});
