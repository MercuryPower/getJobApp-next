import {z} from "zod";
import {ComplaintSchema, LoginSchema, RegistrationSchema} from "@/schemas";
import ComplaintsForm from "@/components/forms/ComplaintsForm";

export const sendComplaint = async (values: z.infer<typeof ComplaintSchema>, vacancy_id: number) => {
    const validatedFields = ComplaintSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Ошибка: Неверные данные для жалобы' };
    }
    try {
        'use server'
        const { report_description} = values;
        const payload = {
            report_description,
            vacancy_id,
        };
        const response = await fetch('http://127.0.0.1:8000/tests/report_vacancy', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            cache:'force-cache'
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