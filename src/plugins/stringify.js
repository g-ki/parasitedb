module.exports = async (dbPromise) => {
  const db = await dbPromise;

  return {
    get: (...args) => db.get(...args),
    has: (...args) => db.has(...args),
    set: (key, value) => {
      if (value instanceof Buffer) {
        value = value.toString('binary');
      } else if (value instanceof Object) {
        value = JSON.stringify(value);
      }

      return db.set(key, value);
    },
    unset: (...args) => db.unset(...args)
  };
};
