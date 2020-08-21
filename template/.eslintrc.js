// const alias = require('./webpack/alias');

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'alloy',
        'alloy/react',
        'alloy/typescript',
        'plugin:react-hooks/recommended'
        // 'plugin:jsx-control-statements/recommended',
        // 'plugin:i18n/recommended',
    ],
    plugins: ['jsx-a11y'],
    rules: {
        // 'i18n/no-chinese-character': 'error',
        '@typescript-eslint/prefer-optional-chain': 'off',
        'max-nested-callbacks': [2, 5],
        'react/jsx-no-undef': [2, { allowGlobals: true }]
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            'eslint-import-resolver-typescript': true,
            node: true
            // webpack: {
            //     config: {
            //         resolve: {
            //             alias: alias(__dirname)
            //         }
            //     }
            // }
        }
    }
};
