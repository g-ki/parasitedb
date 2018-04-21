const aes256 = require('aes256');

const stringify = require('./stringify');

module.exports = async (passphrase, dbPromise) => {
  const db = await dbPromise;

  return stringify({
    get: async (...args) => aes256.decrypt(passphrase, await db.get(...args)),
    has: (...args) => db.has(...args),
    set: (key, value) => db.set(key, aes256.encrypt(passphrase, value)),
    unset: (...args) => db.unset(...args)
  });
};
