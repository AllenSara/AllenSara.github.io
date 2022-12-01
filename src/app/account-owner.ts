export class AccountOwner {
    static accountOwner: any;

    constructor(public name:string="random name",public address:string="",public tz:number=-1,public hasPicture:boolean=false)
    {}

    public static setAccountOwner(accountOwner: any): void {
        this.accountOwner = accountOwner;
    }

    public static getAccountOwner(): any {
        return this.accountOwner;
    }

 }