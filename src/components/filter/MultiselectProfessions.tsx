import React, {useEffect, useState} from 'react';
import {GET_CITIES, GET_PROFESSIONS} from "@/url/urls";
import MultipleSelector, {Option} from "@/components/multiselect";
import {Select} from "@/components/ui/select";

const MultiselectSkills = ({ onChange }: { onChange: (selectedSkills: string[]) => void}) => {
    const [professions, setProfessions] = useState<Option[]>()
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(GET_PROFESSIONS, { cache: 'force-cache', next: { revalidate: 1800 } });
                if (response.ok) {
                    const data = await response.json();
                    const formattedData: Option[] = data.map((item: any) => ({
                        label: item.name,
                        value: item.name,
                    }));
                    setProfessions(formattedData);
                } else {
                    console.error('Ошибка при подгрузке профессий');
                }
            } catch (error) {
                console.error('Ошибка при подгрузке данных:', error);
            }
        };

        void fetchSkills();
    }, []);
    const handleChange = (selected: Option[]) => {
        const selectedValues = selected.map(option => option.value);
        onChange(selectedValues);
    };
    return (
        <div>
            <MultipleSelector onChange={handleChange}  className={'max-h-40 w-full overflow-y-auto overflow-x-hidden'} hidePlaceholderWhenSelected={true}  placeholder="Выберите профессии"  options={professions} emptyIndicator={
                `Данных не найдено.`
            }
            />
        </div>
    );
};

export default MultiselectSkills;