import { BankTransaction } from './bank-transaction';

export class Nihool {
    public static nihoolTransaction: BankTransaction[]=[];
    public static counter: number = 1;
    public static addTransaction(newOne: BankTransaction):void { 
        Nihool.nihoolTransaction.push(newOne);
        Nihool.setStorage('Transactions', Nihool.nihoolTransaction);
        Nihool.counter++;
        Nihool.setStorage('counter', Nihool.counter);
    }

    public static getArraySize():number { return Nihool.nihoolTransaction.length;}
    public static getBalance():number{
        if(Nihool.nihoolTransaction.length==0)
            return 0;
        else{
            return Nihool.nihoolTransaction[Nihool.nihoolTransaction.length-1].currentBalance;
        }
    }
    public static getLastDate():Date {
        return Nihool.nihoolTransaction[Nihool.nihoolTransaction.length-1].trnDate;  
    }
    public static getTransactions():any {
        return Nihool.nihoolTransaction;
    }
    
    public static getFromStorage(variableName: string){
        let objectFromStorage = localStorage.getItem(variableName);
        if(!objectFromStorage){
            return null;
        } else {
            try {
                return JSON.parse(objectFromStorage);
            }
            catch (err: any) {
                console.log(`There was an issue getting ${variableName}: ${err.message}` );
                return null;
            }
        }
    }

    public static setStorage(variableName: string, value: any){
        localStorage.setItem(variableName, JSON.stringify(value));
    }

    public static setStartState(){
        let transactions = Nihool.getFromStorage('Transactions');
        if(transactions){
            Nihool.nihoolTransaction = transactions;
        }

        let counter = Nihool.getFromStorage('counter');
        if(counter){
            Nihool.counter = counter;
        }
    }

    public static getTransactionById(id:number){
        return Nihool.nihoolTransaction[id];
    }

    public static deleteTransaction(id:number){
        Nihool.nihoolTransaction.splice(id,1);
        Nihool.updateTransactionBalance();
    }

    public static updateTransactionBalance(){
        let myBalance:number = 0;
        let counter:number = 1;
        for (let t of Nihool.nihoolTransaction){
            t.trnTyp = Number(t.trnTyp);
            switch (t.trnTyp){
                case 0: myBalance = t.amount;break;
                case 1: myBalance += t.amount;break;
                case 2: myBalance -= t.amount;break;
            }
            t.currentBalance = myBalance;
            t.mispars = counter;
            counter++;
        }
        Nihool.counter = counter;
        Nihool.setStorage('counter', counter);
        Nihool.setStorage('Transactions', Nihool.nihoolTransaction);
    }
}