module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-recommended', 'stylelint-config-prettier'],
  ignoreFiles: ['node_modules/**/*', '.cache/**/*', 'public/**/*'],
  rules: {
    /*
     * Manual
     */
    // コメント記号とコメント本文の間にスペースを強要する 無効化 IntelliJと相性が悪い
    'comment-whitespace-inside': null,
    // @なにがしで意味不明なものを無効化 mixin、loop, modern sass 関係を通す
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'include', 'for', 'use'] }],
    // @extendは難しいから禁止
    'at-rule-disallowed-list': ['extend'],
    // 複雑すぎる指定をはねたいが難しいのでスルー
    'selector-max-specificity': null,
    // コメントの前には空行
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    // CSS Modules用の記法を許可
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local', 'export'] }],
    // 不正なCSSはNGだが、exportの中はなんでもあり
    'property-no-unknown': [true, { ignoreSelectors: [':export'] }],
  },
};
