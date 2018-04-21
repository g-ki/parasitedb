const localHash = require('./local-hash');

const randKey = object => {
  const keys = Object.keys(object);

  return keys[Math.floor(Math.random() * keys.length)];
};


const parasitedb = store => async (hosts) => {
  const randHost = () => randKey(hosts);
  const getHost = name => hosts[name];

  const get = async (key) => {
    const location = await store.get(key);
    const host = getHost(location.host);

    return host.get(location.path);
  };

  const has = async (key) => {
    const location = await store.has(key);
    const host = getHost(location.host);

    return host.has(location);
  };

  const set = async (key, value) => {
    const hostName = randHost();
    const path = await hosts[hostName].set(value);
    const location = { path, host: hostName };

    return store.set(key, location);
  };

  const unset = async (key) => {
    const location = await store.get(key);
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


module.exports = (path, hosts) =>
  parasitedb(await localHash(path))(hosts);
