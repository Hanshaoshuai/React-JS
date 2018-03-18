export interface IFriend {
    readonly workNo: string
    readonly name: string
    readonly nickName: string
    readonly deptName: string
    readonly full: boolean
    readonly canGive: boolean
    readonly energyValue: number
}

export class Friend implements IFriend {
    workNo = '109094'
    name = 'xiaohe'
    nickName = '宵何'
    deptName = '前端二组'
    full = false
    canGive = false
    energyValue = 123
}
