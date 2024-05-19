import React, {useEffect, useState} from 'react';
import {GET_CITIES} from "@/url/urls";
import MultipleSelector, {Option} from "@/components/multiselect";
import {Select} from "@/components/ui/select";

const MultiselectSkills = ({ onChange }: { onChange: (selectedSkills: string[]) => void}) => {
    const [skills, setSkills] = useState<Option[]>()
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/skills`, { cache: 'force-cache', next: { revalidate: 1800 } });
                if (response.ok) {
                    const data = await response.json();
                    const formattedData: Option[] = data.map((item: any) => ({
                        label: item.name,
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
    const handleChange = (selected: Option[]) => {
        const selectedValues = selected.map(option => option.value);
        onChange(selectedValues);
    };
    return (
        <div>
            <MultipleSelector onChange={handleChange}  className={'max-h-40 w-full overflow-y-auto overflow-x-hidden'} hidePlaceholderWhenSelected={true}  placeholder="Выберите навыки"  options={skills} emptyIndicator={
                `Данных не найдено.`
            }
            />
        </div>
    );
};

export default MultiselectSkills;