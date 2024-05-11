export interface VacancyInfo {
    id: number;
    companyName: string;
    vacancyName:string;
    salary?: string;
    tp?:string;
    skills:{
        id:number;
        skill:string;
    }[]
    cities:{
        id:number;
        city:string;
    }[]
    exp:string;
    [key: string]: any;
}