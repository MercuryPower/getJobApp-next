import React from 'react';
import style from "@/app/statistics/style.module.sass";
import {ArrowDown, ArrowUp} from "lucide-react";

const StatisticTips = ({isUp, fadeOut}:{isUp?:boolean, fadeOut:boolean}) => {
    return (
        <div className={`absolute mb-24 flex flex-col gap-x-2 text-current text-center text-xs self-center opacity-50 ${fadeOut ? style.fadeOut : ''} `}>
            {isUp?
                <>
                    <ArrowUp className={'self-center'} />
                    <h5>Нажмите на кнопку, чтобы изменить вид статистики для &quot;Вакансий&quot; или &quot;Соискателей&quot;.</h5>
                </>
                :
                <>
                    <h5>Нажмите на кнопку, чтобы изменить вид статистики для &quot;Вакансий&quot; или &quot;Соискателей&quot;.</h5>
                    <ArrowDown className={'self-center'} />
                </>

            }
        </div>
    );
};

export default StatisticTips;