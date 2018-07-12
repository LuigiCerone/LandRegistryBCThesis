'use strict';
const logger = require('../../server/logger');

module.exports = class Unity {
    constructor(landParcel, ownerAddress) {
        this._landParcel = landParcel;
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
};