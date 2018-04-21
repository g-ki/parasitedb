const axios = require('axios');

module.exports = class Host {
  constructor(postUrl) {
    this.postUrl = postUrl;
  }

  get(url) {
    return axios.get(url).then(res => res.data);
  }

  has(url) {
    return axios.get(url).then(() => true, () => false);
  }

  set(value) {
    return axios.post(this.postUrl, value).then(res => res.data.url);
  }

  unset() {
    // TODO: Implement
    return Promise.resolve();
  }
};
