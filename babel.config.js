const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
  [
    '@babel/preset-env',
  ],
  '@babel/preset-typescript',
  ['@vue/app',
    {useBuiltIns: 'entry'}
  ]
];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
};
