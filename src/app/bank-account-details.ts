const activeBank: string = "Big Bank Inc";

export class BankAccountDetails {
    bankName: string = activeBank;
    limit: number=-2000;
    static bankDetails: any;
    constructor(public branchName?: string, public branchNumber?: number, public accountNumber?: number) { }

    public static setBankDetails(bankDetails: any): void {
        this.bankDetails = bankDetails;
    }

    public static getBankDetails(): any {
        return this.bankDetails;
    }
};
