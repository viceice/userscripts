module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  rules: {},
  overrides: [
    {
      files: ['*.js', '*.ts'],
      env: {
        es2021: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
    },
    {
      files: ['*.user.js', 'MS.RedirectionHelper.js', 'Renovate.Dashboard.js'],
      extends: ['plugin:userscripts/recommended', 'prettier'],
      env: {
        browser: true,
        greasemonkey: true,
      },
    },
    {
      files: [
        'MS.RedirectionHelper.js',
        'Renovate.Dashboard.js',
        'gitea_cb.user.js',
      ],
      rules: {
        'userscripts/filename-user': 0,
        'userscripts/better-use-match': 0,
      },
    },
    {
      files: ['.eslintrc.js'],
      env: {
        node: true,
      },
    },
  ],
};
