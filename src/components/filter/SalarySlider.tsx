import React, {useState} from 'react';
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import {FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
type SliderProps = React.ComponentProps<typeof Slider>
const SalarySlider = ({ className,onChange, ...props }: SliderProps) => {
    const [range, setRange] = useState([0, 300000]);
    const [minSalary, setMinSalary] = useState<number>(0);
    const [maxSalary, setMaxSalary] = useState<number>(300000);

    const handleRangeChange = (value: number[]) => {
        setRange(value);
        setMinSalary(value[0]);
        setMaxSalary(value[1]);
        // if (onChange) {
        //     onChange(value);
        // }
    };

    const handleMinSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value.replace(/\D/g, ''));
        if (!isNaN(value)) {
            setMinSalary(value);
            setRange([value, maxSalary]);
        }
    };

    const handleMaxSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value.replace(/\D/g, ''));
        if (!isNaN(value)) {
            setMaxSalary(value);
            setRange([minSalary, value]);
        }
    };

    return (
        <div className={cn("slider-container", className)}>
            <div className="flex justify-between p-2">
                <div className={'flex '}>
                    <span className={'text-sm self-center'}>От</span>
                    <Input min={0} className={'text-sm w-20 h-10 p-2 '}  type="text" value={minSalary.toLocaleString()} onChange={handleMinSalaryChange} />
                    <span className={'text-sm self-center'}>₽</span>
                </div>
                <div className={'flex'}>
                    {maxSalary >= 500000 ? <span className={'text-sm self-center'}>{`< `}</span> :
                        <span className={'text-sm self-center'}>До</span>
                    }
                    <Input className={'text-sm w-20 h-10 p-2'}  type="text" value={maxSalary.toLocaleString()} onChange={handleMaxSalaryChange} />
                    <span className={'text-sm self-center'}>₽</span>
                </div>
            </div>
            <Slider
                defaultValue={[0, 300000]}
                max={500000}
                min={0}
                step={500}
                value={range}
                onValueChange={handleRangeChange}
                {...props}
            />
        </div>
    );
};

export default SalarySlider;