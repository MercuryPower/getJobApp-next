import React from 'react';
import {Form} from "@/components/ui/form";
import {ComboboxCity} from "@/components/filter/ComboboxCities";
import SelectTypeOfEmploy from "@/components/filter/SelectTypeOfEmploy";
import MultiselectSkills from "@/components/filter/MultiselectSkills";
import SalarySlider from "@/components/filter/SalarySlider";
import {Button} from "@/components/ui/button";

const VacancyFilter = () => {
    return (
        <div className={'flex flex-col justify-items-center shadow-lg m-4 p-4 border text-center  rounded-2xl space-y-2 w-72 h-fit '}>
            <h2 className={'font-bold text-xl'}>Фильтр</h2>
            {/*<Form {...form}>*/}
            {/*    <form onSubmit={form.handleSubmit(onSubmit)}>*/}
                    <div className={'space-y-4 pt-6'}>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Город</h3>
                            <ComboboxCity  />
                        </div>
                        <div className={'space-y-2' }>
                            <h3 className={'text-lg'}>Тип занятости</h3>
                            <SelectTypeOfEmploy />
                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Навыки</h3>
                            <MultiselectSkills />
                        </div>
                        <div className={'space-y-2'}>
                            <h3 className={'text-lg'}>Желаемая зарплата</h3>
                            <SalarySlider />
                        </div>
                    </div>
                    <Button type={'submit'} className={'m-2'}>Поиск</Button>
            {/*    </form>*/}
            {/*</Form>*/}
        </div>
    );
};

export default VacancyFilter;