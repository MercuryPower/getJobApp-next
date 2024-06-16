import React, {useEffect, useState} from 'react';
import MultipleSelector, {Option} from "@/components/multiselect";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";
import {CheckedState} from "@radix-ui/react-checkbox";
import {GET_TYPES_OF_EMPLOY} from "@/url/urls";
const SelectTypeOfEmploy = ({onChecked}: { onChecked: (typeOfEmploy: (prevSelected: string[]) => any) => void }) => {
    const [typesOfEmploy, setTypesOfEmploy] = useState<Array<{id: number, name: string}>>([])


    useEffect(() => {
        const fetchTypesOfEmploy = async () => {
            try {
                const response = await fetch(GET_TYPES_OF_EMPLOY, { cache: 'force-cache', next: { revalidate: 1800 } });
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
                        id={`checkbox-${index}`}
                        className={'self-center'}
                        key={type.id}
                        onCheckedChange={(checked) => handleCheckboxChange(type.id.toString(), checked)}
                    />
                    <label htmlFor={`checkbox-${index}`} className={'max-h-20 text-start '}>{type.name}</label>
                </div>
            ))}
        </div>
    )
};

export default SelectTypeOfEmploy;