import {z} from "zod";
import {ComplaintSchema, LoginSchema, RegistrationSchema} from "@/schemas";
import ComplaintsForm from "@/components/forms/ComplaintsForm";
import {json} from "stream/consumers";

export const sendComplaint = async (values: z.infer<typeof ComplaintSchema>, vacancy_id: number, report_username?: string, report_user_id?:number) => {
    const validatedFields = ComplaintSchema.safeParse(values);
    if(!report_username){
        report_username = 'Аноним'
    }
    if (!validatedFields.success) {
        return { error: 'Ошибка: Неверные данные для жалобы' };
    }
    try {
        'use server'
        const { description, report_type} = values;
        const payload = {
            vacancy_id,
            report_username,
            description,
            report_type,
            report_user_id
        };
        console.log(payload)
        const response = await fetch(`http://127.0.0.1:8000/tests/report_vacancy`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        });
        if (response.ok) {
            return { success: 'Жалоба успешно отправлена' };
        }
        else{
            return {error:'Ошибка при отправке жалобы'}
        }
    } catch (error) {
        return {error:'Ошибка при отправке жалобы'}
    }

}