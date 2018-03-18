import { action, observable } from 'mobx'
import { ICard } from './card'
import { IEmployee, Employee } from './employee'


class UserInfo {
    @observable energyBlockCount: number = 0
    @observable lottery: boolean = false
    @observable employee: IEmployee = new Employee()
}

export default new UserInfo()


