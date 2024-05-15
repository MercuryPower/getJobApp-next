import React, {useEffect, useState} from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {GET_CITIES} from "@/url/urls";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {DropdownMenuCheckboxItemProps} from "@radix-ui/react-dropdown-menu";
import {Checkbox} from "@/components/ui/checkbox";
import {FormControl} from "@/components/ui/form";

const SelectTypeOfEmploy = () => {
    const [typesOfEmploy, setTypesOfEmploy] = useState<Array<{title:string}>>([])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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
        <Select>
            <SelectTrigger className="inline-flex items-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-[200px] overflow-hidden justify-between max-w-xs">
                <SelectValue placeholder="Выберите тип занятости" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className={'w-[200px] '}>
                    <SelectLabel>Тип занятости</SelectLabel>
                        {typesOfEmploy.map((type, index) => (
                            <SelectItem key={index} value={type.title}>
                                {type.title}
                            </SelectItem>
                        ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectTypeOfEmploy;