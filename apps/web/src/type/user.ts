export interface IRegister{
    name: string;
    email: string;
    password: string;
    referCode: string;
    role: string;
}

export interface ILogin{
    email: string;
    password: string;
}

export interface ITransaction{
    ticket: string;
    totalPrice: number;
    createdAt: string;
}




export interface IUser{
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    referCode: string;
    createdAt: string;
    //transactions: ITransaction[];
    //reviews: IReview[];
    //events: IEvent[];

    
}

export interface IEditName{
    name: string;
}

export interface IEditPassword{
    password: string;
}

export interface IEditEmail{
    email: string;
}

export interface IEditAvatar{
    avatar: string;
}

export interface IBecomeOrganizer{
    role: "ORGANIZER";
}

export type SideBarOption = 'profile' | 'event' | 'ticket' | 'transaction' | 'account' | 'dashboard';

export type OrganizerOption = 'event' | 'attendees' | 'transaction' | 'statistic';
