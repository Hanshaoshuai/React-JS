import * as lang from '../lib/lang'

const textForCN = require('./zh')
const textForEN = require('./en')
const i18nHelper = require('i18n-helper')(lang.zhCN ? textForCN : textForEN);

i18nHelper.keyNotFound = key => `文案暂缺: ${key}`;

module.exports = i18nHelper;
