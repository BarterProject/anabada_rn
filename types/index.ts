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

export type testItem={
    id:number;
    clause_agree:boolean;
    deposit:string;
    description:string;
    imgName:string;
    name:string;
}

export type ItemImage={
    idx: number;
    name: string;
    createdAt: string;
    number: number;
    originalName: string;
    saveName: string;
    size: number;
    uploadPath: string;
    extension: string;
}

export type User = {
    idx: null;
    email: string;
    password: string;
    phone: string;
    address:string;
    bankAccount: string;
    bankKind: string;
    createdAt: string;
    oauth: string;
    activated: true;
    auth: string;
}

export type Item={
    idx:number;
    name:string;
    description:string;
    createdAt:string;
    endAt:string|null;
    deposit:number;
    clause_agree:boolean;
    payment:string|null;
    itemCategory:any;
    images : ItemImage[];
    registrant:User;
    owner:User;
    state:number;
    delivery:null;
}
