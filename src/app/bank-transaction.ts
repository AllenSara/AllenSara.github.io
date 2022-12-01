export enum TransactionType { openAcount, deposit, withdraw }

export const TransactionTypeNames = ['Open Account', 'Deposit', 'Withdraw']

export class BankTransaction {
    constructor(public amount: number, public trnDate: Date = new Date(), public asmachta: string, public trnTyp: TransactionType, public currentBalance: number, public mispars: number, public note?: string) { }
    toString(): string {
        return `on ${this.trnDate.toDateString()} a ${TransactionType[this.trnTyp]} of ${this.amount} NIS`;
    }

}