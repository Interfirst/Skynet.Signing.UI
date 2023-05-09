const path = require('path');

module.exports = {
  extends: require.resolve('@interfirst/presets/eslint'),
  rules: {
    'react-perf/jsx-no-new-function-as-prop': 1,
    'react-perf/jsx-no-new-object-as-prop': 1,
    'react/default-props-match-prop-types': 2,
    'no-duplicate-imports': 2,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^prop-types', '^@?\\w'],
          ['^(components/|constants/|utils/|hooks|shared|contexts/)'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^\\u0000'],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};
