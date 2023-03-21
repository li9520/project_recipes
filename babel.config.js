module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', 'mobx'];

  const plugins = [
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-proposal-optional-chaining',
    process.env.NODE_ENV === 'development' && 'react-refresh/babel',
    '@babel/plugin-proposal-class-properties',
  ].filter(Boolean);

  return {
    presets,
    plugins
  }
}