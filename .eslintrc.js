module.exports = {
    root: true,
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [4, { 'x-invalid-end-tag': false }],
        'no-undef': 'off',
        // 限定单引号字符串
        'quotes': [ 'error', 'single' ],
        // 限定代码缩进4个空格
        'indent': ['error', 4],
        // 允许使用console
        'no-console': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
