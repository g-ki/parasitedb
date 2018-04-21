const localHash = require('./local-hash');

const randKey = object => {
  const keys = Object.keys(object);

  return keys[Math.floor(Math.random() * keys.length)];
};

module.exports = async (path, hosts) => {
  const store = await localHash.open(path);
  const collection = localHash;
  const randHost = () => randKey(hosts);
  const getHost = name => hosts[name];

  const get = async (key) => {
    const location = await collection.get(key, store);
    const host = getHost(location.host);

    return host.get(location.path);
  };

  const has = async (key) => {
    const location = await collection.has(key, store);
    const host = getHost(location.host);

    return host.has(location);
  };

  const set = async (key, value) => {
    const hostName = randHost();
    const path = await hosts[hostName].set(value);
    const location = { path, host: hostName };

    return collection.set(key, location, store);
  };

  const unset = async (key) => {
    const location = await collection.get(key, store);
    const host = getHost(location.host);

    return host.unset(location);
  };

  return {
    get,
    has,
    set,
    unset,
  };
}
