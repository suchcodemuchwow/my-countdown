module.exports = (/** @type {{ cache: (arg0: boolean) => void; }} */ api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
