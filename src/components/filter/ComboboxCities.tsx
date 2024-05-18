"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem, CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect, useState} from "react";
import {GET_CITIES} from "@/url/urls";




export function ComboboxCity({ setSelectedCity }: { setSelectedCity: (city: string) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [cities, setCities] = useState<Array<{id:number; name:string}>>([])
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (response.ok) {
                    const data = await response.json();
                    setCities(data);
                } else {
                    console.error('Failed to fetch cities');
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        void fetchCities();
    }, []);
    const handleSelect = (currentValue: string) => {
        const selectedCity = currentValue === value ? "" : currentValue
        setValue(selectedCity)
        setOpen(false)
        setSelectedCity(selectedCity) // Communicate the selected city to the parent
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] overflow-hidden justify-between max-w-xs"
                >
                    {value
                        ? cities.find((city) => city.name  === value)?.name
                        : "Выберите город   "}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Выберите город" />
                    <CommandEmpty>Город не найден</CommandEmpty>
                    <CommandList>
                        {cities.map((city) => (
                            <CommandItem
                                key={city.id}
                                value={city.name}
                                onSelect={handleSelect}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === city.name ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {city.name}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
export default ComboboxCity
