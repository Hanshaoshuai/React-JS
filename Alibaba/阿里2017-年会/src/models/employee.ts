
export enum EnergyBlockTypes {
    blocked = 'y',
    unblock = 'n'
}

export interface IEmployee {
    readonly workNo: string
    readonly name: string
    readonly deptName: string
    readonly energyValue: string
    readonly energyBlock: EnergyBlockTypes
    readonly draw: string
    readonly giveEnergyValue: string
    readonly receiveEnergyValue: string
}