/*
 * @Author: your name
 * @Date: 2020-11-21 12:51:39
 * @LastEditTime: 2020-11-21 12:54:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off", // 开启后未被使用的变量会报错
    "no-prototype-builtins": "off", // 开启后将默认使用O bject.propertype 内置属性
    "vue/return-in-computed-property": "off", // 开启后此规则强制 return 语句在 computed 属性中得完整存在。
    "vue/no-side-effects-in-computed-properties": "off", // 开启后在计算属性内直接修改 data 里面的数据将报错
    "vue/require-valid-default-prop": "warn", // vue props 为对象 or 数组时指定默认值必须以一个工厂函数的形式返回 eg: () => []
    "vue/no-parsing-error": [
      "error",
      {
        "control-character-in-input-stream": false // 开启后某些注释将会报错
      }
    ],
    "prettier/prettier": [
      "error",
      {
        // 最大打印宽度，超出将换行
        printWidth: 200,
        // tab缩进 默认为 2
        tabWidth: 2,
        // 行末加分号
        semi: true,
        // 默认单引号 ，false 默认使用双引号
        singleQuote: false,
        // 在 JSX 中，默认单引号 ，false 默认使用双引号
        jsxSingleQuote: false,
        // 尽可能控制尾随逗号的输出
        // none 无尾随逗号
        // es5 在ES5中有效的尾随逗号（对象，数组等）
        // all 尾随逗号 尽可能（函数参数）
        trailingComma: "none",
        // 对象&数组是否追加空格
        // e.g. false: {foo:bar}
        // true: { foo: bar }
        bracketSpacing: true,
        // 箭头函数参数括号 默认avoid 可选 avoid | always
        // avoid 能省略括号的时候就省略 例如x => x
        // always 总是有括号
        arrowParens: "avoid",
        // 将多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行
        jsxBracketSameLine: true,
        // 解决格式化插件 Prettier，格式化操作后，结束标签>跑到下一行的问题。
        htmlWhitespaceSensitivity: "ignore"
      }
    ]
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        mocha: true
      }
    }
  ]
};
