'use strict';

module.exports = class Unity {
    constructor(district, document, landParcel, subaltern, ownerAddress) {
        this._district = district;
        this._document = document;
        this._landParcel = landParcel;
        this._subaltern = subaltern;
        this._ownerAddress = ownerAddress;
    }

    get landParcel() {
        return this._landParcel;
    }

    set landParcel(value) {
        this._landParcel = value;
    }

    get ownerAddress() {
        return this._ownerAddress;
    }

    set ownerAddress(value) {
        this._ownerAddress = value;
    }

    get district() {
        return this._district;
    }

    set district(value) {
        this._district = value;
    }

    get document() {
        return this._document;
    }

    set document(value) {
        this._document = value;
    }

    get subaltern() {
        return this._subaltern;
    }

    set subaltern(value) {
        this._subaltern = value;
    }
};