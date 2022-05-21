export type imageToSendType = {
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

export type itemToSendType = {
    name: string,
    description: string,
    clause_agree: boolean,
    payment: { amount: number, optionIdx: number },
    categoryIdx: number
}

export type imageType = {
    createdAt: Date,
    extension: string,
    idx: number,
    name: string,
    number: number,
    originalName: string,
    saveName: string,
    size: number,
    uploadPath: string,
}

export type userType = {
    activated: boolean,
    address: string,
    auth: string,
    bankAccount: string,
    bankKind: string,
    createdAt: Date,
    email: string,
    idx: number,
    oauth: string,
    password: string,
    phone: string,
}

export type deliveryType = {
    address: string,
    clauseAgree: boolean,
    company: string | null,
    createdAt: Date,
    dueAt: Date,
    idx: number,
    item: any,
    phone: string,
    receiverName: string,
    state: number,
    trackingNumber: number,
}

export type itemType = {
    clause_agree:boolean,
    createdAt:Date,
    delivery:deliveryType,
    deposit:number,
    description:string,
    endAt:Date,
    idx:number,
    images: imageType[]
    itemCategory:{
        idx:number,
        name:string
    },
    name:string,
    owner:userType,
    payment:{
        amount: number,
        createdAt: Date,
        idx: number,
        paymentOption: {
            description: string,
            idx: number,
            name: string,
          },
        state: number,
    },
    registrant:userType,
    state:number
}

export type noticeType = {
    content: string,
    createdAt: Date,
    idx: number,
    kind: string,
    route: string,
    state: number,
    user: userType,
}
