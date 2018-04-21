module.exports = {
  get: () => Promise.resolve(null),
  has: () => Promise.resolve(false),
  set: () => Promise.resolve(),
  unset: () => Promise.resolve()
}
