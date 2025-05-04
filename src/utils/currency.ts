import { MyBig } from "@/lib/big";

export const toCent = (amount: number) =>{
    // if (amount === null || amount === undefined || isNaN(amount)) {
    //     return 0;
    // }

    return new MyBig(amount).mul(100).round(2).toNumber()
};

export const fromCent = (amount: number) => {
    // if (amount === null || amount === undefined || isNaN(amount)) {
    //     return 0;
    // }
    
    return new MyBig(amount).div(100).round(2).toNumber()
};

export const toCurrencyFromCent = (amount: number) => {
    // if (amount === null || amount === undefined || isNaN(amount)) {
    //     amount = 0;
    // }

    return new Intl.NumberFormat("en-Us",{
        style: "currency",
        currency: "USD",
    }).format(fromCent(amount));
};