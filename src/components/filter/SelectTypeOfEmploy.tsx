import React, {useEffect, useState} from 'react';
import MultipleSelector, {Option} from "@/components/multiselect";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";
import {CheckedState} from "@radix-ui/react-checkbox";
const SelectTypeOfEmploy = ({onChecked}: { onChecked: (typeOfEmploy: (prevSelected: string[]) => any) => void }) => {
    const [typesOfEmploy, setTypesOfEmploy] = useState<Array<{id: number, name: string}>>([])


    useEffect(() => {
        const fetchTypesOfEmploy = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/tests/types_of_employ`, { cache: 'force-cache', next: { revalidate: 1800 } });
                if (response.ok) {
                    const data = await response.json();
                    setTypesOfEmploy(data);
                } else {
                    console.error('Failed to fetch cities');
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        void fetchTypesOfEmploy();
    }, []);
    const handleCheckboxChange = (id: string, checked: CheckedState) => {
        onChecked((prevSelected: string[]) => {
            const idString = id.toString();
            if (checked) {
                return [...prevSelected, idString];
            } else {
                return prevSelected.filter((selectedId) => selectedId !== idString);
            }
        });
    };
    return (
        <div>
            {typesOfEmploy.map((type, index) => (
                <div key={index} className={'flex space-x-1'}>
                    <Checkbox
                        className={'self-center'}
                        key={type.id}
                        onCheckedChange={(checked) => handleCheckboxChange(type.id.toString(), checked)}
                    />
                    <span className={'max-h-20 text-start '}>{type.name}</span>

                </div>
            ))}
        </div>
    )
};

export default SelectTypeOfEmploy;