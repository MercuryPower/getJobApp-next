import React, {createContext, Dispatch, SetStateAction} from "react";

export interface VacancyInfo {
    id: number;
    user_id:number;
    companyName: string;
    vacancy_name:string;
    salary_type:string;
    fixed_salary:number;
    max_salary:number;
    min_salary:number;
    types_of_employ?:{
        id:number;
        name:string;
    }[];
    skills:{
        id:number;
        name:string;
    }[]
    cities:{
        id:number;
        name:string;
    }[]
    exp:string;
    description:string;
    contacts:string;
    registered_at:string;
    created_at:string;
    companyDescription:string;
    [key: string]: any;
}
export interface ResumeInfo extends VacancyInfo {
    resume:string;
}
export interface IsEmployerContextProps {
    isEmployer: boolean;
    setIsEmployer: Dispatch<SetStateAction<boolean>>;
}

export interface VacancyStatisticProps {
    grade: string;
    profession: string;
    averageSalaryByGrades: number;
    amountOfVacancies: number;
}

export interface ResumeStatisticProps {
    grade: string;
    profession: string;
    expectedSalary: number;
    numberOfApplications: number;
}
export const columnTranslations: { [key: string]: string } = {
    grade: "Грейд",
    profession: "Профессия",
    averageSalaryByGrades: "Средняя зарплата по грейдам",
    amountOfVacancies: "Количество вакансий",
    expectedSalary: "Ожидаемая зарплата",
    numberOfApplications: "Количество заявок"
};
export type StatisticProps = VacancyStatisticProps | ResumeStatisticProps;