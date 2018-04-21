const axios = require('axios');

module.exports = class Hastebin {
  constructor(hasteServer = 'https://hastebin.com') {
    this.hasteServer = hasteServer;
  }

  get(url) {
    return axios.get(url).then(res => res.data);
  }

  has(url) {
    return axios.get(url).then(() => true, () => false);
  }

  set(value) {
    return axios.post(`${this.hasteServer}/documents`, value)
      .then(res => `${this.hasteServer}/raw/${res.data.key}`);
  }

  unset() {
    return Promise.resolve();
  }
};

