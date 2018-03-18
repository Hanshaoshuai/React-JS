import * as lang from './lang'
import { showError } from './utils'

interface IPaginationQuery {
    readonly pageSize: number
    readonly currentPage: number
}

interface IResponse {
    readonly success: boolean
    readonly errorMsg: string
    readonly errorCode: string
    readonly data?: any
}

export const nativeRpc = (actionName:string, params: object) => {

    if (__LOCAL__) {
        return new Promise(resolve => {
            $.ajax({
                url: `/mock/${actionName}`,
                method: 'get',
                params,
                success: (response:IResponse) => resolve(response.data)
            })
        })
    }

    if (!window.AlipayJSBridge) {
        /* eslint-disable no-alert */
        alert('AlipayJSBridge not found')

        return Promise.reject({
            success: false,
            errorCode: -1,
            errorMsg: 'AlipayJSBridge not found, please open the page in AliNeiWai app',
        })
    }

    return new Promise((resolve, reject) => {
        AlipayJSBridge.call('bucRpc', {
            apiName: actionName,
            parameters: {
                ...params,
            },
        }, ({ success, errorCode, errorMsg, data }:IResponse) => {
            if (success) {
                resolve(data)
            } else {
                reject({
                    success,
                    errorCode,
                    errorMsg,
                })
            }
        })
    })
}

export const request = (actionName: string, params: any) => nativeRpc(
    `portal/energy/${actionName}.json`,
    params,
).catch(e => {
        const { errorMsg } = e

        showError(errorMsg)

        return Promise.reject(e)
    })

// 员工信息接口，包括用户信息、拥有的卡片
export const employee = () => request('employee', {})
export const clickCard = () => request('clickLogo', {})
export const employeeList = () => request('employeeList', {})
export const friendList = (query: IPaginationQuery) => request('friendList', query)
export const giveEnergy = (query: any) => request('giveEnergy', query)
export const receiveEnergyList = (query: IPaginationQuery) => request('receiveEnergyList', query)
export const findEmployee = (query: any) => request('findEmployee', query)

