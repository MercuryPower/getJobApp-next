import React, {useEffect, useState} from 'react';
import {GET_CITIES} from "@/url/urls";
import MultipleSelector, {Option} from "@/components/multiselect";
import {Select} from "@/components/ui/select";

const MultiselectSkills = () => {
    const [skills, setSkills] = useState<Option[]>()
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, { cache: 'force-cache', next: { revalidate: 1800 } });
                if (response.ok) {
                    const data = await response.json();
                    const formattedData: Option[] = data.map((item: any) => ({
                        label: item.title,
                        value: item.id,
                    }));
                    setSkills(formattedData);
                } else {
                    console.error('Failed to fetch cities');
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        void fetchSkills();
    }, []);
    return (
        <div>
            <MultipleSelector className={'max-h-40 w-full overflow-y-auto overflow-x-hidden'} hidePlaceholderWhenSelected={true}  placeholder="Выберите навыки"  options={skills} emptyIndicator={
                `Данных не найдено.`
            }
            />
        </div>
    );
};

export default MultiselectSkills;