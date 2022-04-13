export type imageType = {
    cancelled: boolean;
    height: number;
    type: string;
    path: string;
    width: number;
    sourceURL:string;
}

export type categoryType = {
    idx: number,
    name: string,
    check:boolean
}

export type paymentOptionType = {
    idx: number,
    name: string,
    check:boolean,
    description:string
}

export type itemType = {
    name: string,
    description: string,
    clause_agree: boolean,
    payment: { amount: number, paymentOption: { idx: number } },
    itemCategory: { idx: number }
}
