"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang = require("./lang");
const utils_1 = require("./utils");
exports.nativeRpc = (actionName, params) => {
    if (__LOCAL__) {
        return new Promise(resolve => {
            $.ajax({
                url: `/mock/${actionName}`,
                method: 'get',
                params,
                success: response => resolve(response.data)
            });
        });
    }
    if (!window.AlipayJSBridge) {
        /* eslint-disable no-alert */
        alert('AlipayJSBridge not found');
        return Promise.reject({
            success: false,
            errorCode: -1,
            errorMsg: 'AlipayJSBridge not found, please open the page in AliNeiWai app',
        });
    }
    return new Promise((resolve, reject) => {
        AlipayJSBridge.call('bucRpc', {
            apiName: actionName,
            parameters: Object.assign({}, params),
        }, ({ success, errorCode, errorMessage, content }) => {
            if (success) {
                resolve(content);
            }
            else {
                reject({
                    success,
                    errorCode,
                    errorMsg: errorMessage,
                });
            }
        });
    });
};
exports.request = (actionName, params) => exports.nativeRpc(`portal/energy/${actionName}.json`, Object.assign({ locale: lang.enUS ? 'en' : 'cn' }, params)).catch(e => {
    const { errorMsg } = e;
    utils_1.showError(errorMsg);
    return Promise.reject(e);
});
// 员工信息接口，包括用户信息、拥有的卡片
exports.employee = () => exports.request('employee', {});
exports.clickCard = () => exports.request('clickLogo', {});
exports.shareCard = (cardId) => exports.request('shareFiveCard', {});
exports.employeeList = () => exports.request('employeeList', {});
exports.friendList = (query) => exports.request('friendList', {});
//# sourceMappingURL=request.js.map