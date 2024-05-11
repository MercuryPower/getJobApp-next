export default class VacancyService {
   static async getVacancies(limit = 5, page = 1) {

   }
   static async getVacancyById(id: string | number | undefined) {
      return await fetch(`http://127.0.0.1:8000/vacancies?${id}`);
   }

}