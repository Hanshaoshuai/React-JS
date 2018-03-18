import * as _ from 'lodash'
import { request } from '../lib/request'

export interface ICard {
    readonly cardName: string
    readonly cardValue: string
    readonly order: number
    readonly receive: boolean
    readonly score: number
}

export const generateUnknownCard = (order: number, score: number):ICard => {
    return {
        cardName: String(score),
        cardValue: 'unknown',
        order,
        receive: false,
        score,
    } as ICard
}

export const generateCardList = (arr: Array<ICard>): Array<ICard> => {
    const nextArr: Array<ICard> = []

    _.times(5, (i: number):void => {
        const item = arr[i]


        if (item) {
            nextArr.push({ ... item })
        } else {
            nextArr
        }

        nextArr.push(item ? { ...item } : generateUnknownCard(i, i*2000 + 1000))
    })

    return nextArr
}

export const reportCardReceived = (card: ICard): Promise<any> => {
    return request('clickFiveCard', { cardValue: card.cardValue })
}

export const shareCard = (card: ICard):Promise<any> => {
    return request('shareFiveCard', { cardValue: card.cardValue })
}