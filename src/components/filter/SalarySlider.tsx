'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import {FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
type SliderProps = React.ComponentProps<typeof Slider>
interface SalarySliderProps extends SliderProps {
    onChangeMinSalary: (value: number) => void;
    onChangeMaxSalary: (value: number) => void;
}
const SalarySlider = ({ className,onChangeMinSalary, onChangeMaxSalary, ...props }: SalarySliderProps) => {
    const [range, setRange] = useState([0, 500000]);
    const [minSalary, setMinSalary] = useState<number>(0);
    const [maxSalary, setMaxSalary] = useState<number>(500000);

    const handleRangeChange = useCallback((value: number[]) => {
        setRange(value);
        setMinSalary(value[0]);
        setMaxSalary(value[1]);
        if (onChangeMinSalary && onChangeMaxSalary) {
            onChangeMinSalary(value[0]);
            onChangeMaxSalary(value[1]);
        }
    }, [onChangeMaxSalary, onChangeMinSalary]);

    const handleMinSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(event.target.value.replace(/\D/g, ''));
        value = Math.min(value, 500000);
        if (!isNaN(value)) {
            setMinSalary(value);
            setRange([value, maxSalary]);
        }
    };

    const handleMaxSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(event.target.value.replace(/\D/g, ''));
        value = Math.min(value, 500000);
        if (!isNaN(value)) {
            setMaxSalary(value);
            setRange([minSalary, value]);
        }
    };

    useEffect(() => {
        handleRangeChange(range);
    }, [minSalary, maxSalary, handleRangeChange, range]);
    return (
        <div className={cn("slider-container", className)}>
            <div className="flex justify-between  p-2">
                <div className={'flex  '}>
                    <span className={'text-sm self-center'}>От</span>
                    <Input min={0} className={'text-sm w-20 h-10 p-2 '}  type="text" value={minSalary.toLocaleString()} onChange={handleMinSalaryChange} />
                    <span className={'text-sm self-center'}>₽</span>
                </div>
                <div className={'flex'}>
                    {maxSalary >= 500000 ? <span className={'text-sm self-center'}>{`> `}</span> :
                        <span className={'text-sm self-center'}>До</span>
                    }
                    <Input className={'text-sm w-20 h-10 p-2'}  type="text" value={maxSalary.toLocaleString()} onChange={handleMaxSalaryChange} />
                    <span className={'text-sm self-center'}>₽</span>
                </div>
            </div>
            <Slider
                defaultValue={[0, 500000]}
                max={500000}
                min={0}
                step={5000}
                value={range}
                onValueChange={handleRangeChange}
                {...props}
            />
        </div>
    );
};

export default SalarySlider;