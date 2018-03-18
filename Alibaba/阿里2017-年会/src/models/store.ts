import { observable } from 'mobx'
import { IFriend } from './friend'
import { ICard, generateCardList } from './card'
import { IMessage } from './message'
import { IEmployee } from './employee'
import { request } from '../lib/request'

export interface IStore {
    energyBlockCount: number
    lottery: boolean
    employee: IEmployee
    fiveCard: Array<ICard>
}

export class Store {
    @observable
    public energyBlockCount: number = 0
    @observable
    public lottery: boolean = false
    @observable
    public employee: IFriend = {} as IFriend
    @observable
    public cards:Array<ICard> = []
    @observable
    public friends: Array<IFriend> = []

    @observable
    public hasMessage: boolean = false
    @observable
    public messages: Array<IMessage> = []
}


export const fetchStore = () => {
    return request('employee', {})
        .then((resp: IStore) => {
            return observable({
                energyBlockCount: resp.energyBlockCount,
                lottery: resp.lottery,
                employee: observable(resp.employee) as IEmployee,
                fiveCard: observable(generateCardList(resp.fiveCard))) as Array<ICard>,
            }) as IStore
        })
}