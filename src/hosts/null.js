const set = (rootNode, key, value) => Promise.resolve({ key, value })

const get = (rootNode, key) => Promise.resolve({ key, value: null })

const del = (rootNode, key) => Promise.resolve({ key })
