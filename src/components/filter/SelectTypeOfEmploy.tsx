import React, {useEffect, useState} from 'react';
import MultipleSelector, {Option} from "@/components/multiselect";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";
const SelectTypeOfEmploy = () => {
    const [typesOfEmploy, setTypesOfEmploy] = useState<Array<{id: number, title: string}>>([])
    const [selectedTypesOfEmploy, setSelectedTypesOfEmploy] = useState([]);


    useEffect(() => {
        const fetchTypesOfEmploy = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, { cache: 'force-cache', next: { revalidate: 1800 } });
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
    return (
        <div>
            {typesOfEmploy.map((type, index) => (
                <div key={index} className={'flex'}>
                    <Checkbox
                        key={type.id}
                    />
                    <span className={''}>{type.title}</span>

                </div>
            )).slice(0, 4)}
        </div>
    )
};

export default SelectTypeOfEmploy;