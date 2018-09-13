const bs58 = require('bs58');
/**
 * Credits to https://github.com/saurfang/ipfs-multihash-on-solidity.
 */

/**
 * @typedef {Object} Multihash
 * @property {string} digest The digest output of hash function in hex with prepended '0x'
 * @property {number} hashFunction The hash function code for the function used
 * @property {number} size The length of digest
 */

module.exports = {
  /**
   * Partition multihash string into object representing multihash
   *
   * @param {string} multihash A base58 encoded multihash string
   * @returns {Multihash}
   */
  getBytes32FromMultiash(multihash) {
    const decoded = bs58.decode(multihash);

    return {
      digest: `0x${decoded.slice(2).toString('hex')}`,
      hashFunction: decoded[0],
      size: decoded[1],
    };
  },

  /**
   * Encode a multihash structure into base58 encoded multihash string
   *
   * @param {Multihash} multihash
   * @returns {(string|null)} base58 encoded multihash string
   */
  getMultihashFromBytes32(multihash) {
    const {digest, hashFunction, size} = multihash;
    if (size === 0) return null;

    // cut off leading "0x"
    const hashBytes = Buffer.from(digest.slice(2), 'hex');

    // prepend hashFunction and digest size
    const multihashBytes = new (hashBytes.constructor)(2 + hashBytes.length);
    multihashBytes[0] = hashFunction;
    multihashBytes[1] = size;
    multihashBytes.set(hashBytes, 2);

    return bs58.encode(multihashBytes);
  },

  /**
   * Parse Solidity response in array to a Multihash object
   *
   * @param {object} response Response object from Solidity
   * @returns {Multihash} multihash object
   */
  parseContractResponse(response) {
    const [digest, hashFunction, size] = Object.values(response);
    return {
      digest,
      hashFunction: parseInt(hashFunction),
      size: parseInt(size),
    };
  },

  /**
   * Parse Solidity response in array to a base58 encoded multihash string
   *
   * @param {array} response Response array from Solidity
   * @returns {string} base58 encoded multihash string
   */
  getMultihashFromContractResponse(response) {
    return this.getMultihashFromBytes32(this.parseContractResponse(response));
  },
};