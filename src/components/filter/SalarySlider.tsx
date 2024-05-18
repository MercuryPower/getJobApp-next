import React, {useState} from 'react';
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import {FormItem} from "@/components/ui/form";
type SliderProps = React.ComponentProps<typeof Slider>
const SalarySlider = ({ className,onChange, ...props }: SliderProps) => {
    const [range, setRange] = useState([0, 500000]);

    // const handleRangeChange = (value: number[]) => {
    //     setRange(value);
    //     if (onChange) {
    //         onChange(value);
    //     }
    // };

    return (
        <div className={cn("slider-container", className)}>
            <Slider
                defaultValue={[0, 500000]}
                max={500000}
                min={0}
                step={500}
                value={range}
                // onValueChange={handleRangeChange}
                {...props}
            />
            <div className="flex p-2 justify-center slider-labels space-x-2">
                <FormItem>от {range[0].toLocaleString()} ₽</FormItem>
                <FormItem>до {range[1].toLocaleString()} ₽ {range[1] >= 500000 && String(`и более`) }</FormItem>
            </div>
        </div>
    );
};

export default SalarySlider;