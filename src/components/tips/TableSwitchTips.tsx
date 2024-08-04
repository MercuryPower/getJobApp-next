import React from 'react';
import style from "@/styles/style.module.sass";
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp} from "lucide-react";

const TableSwitchTips = ({isUp, isLeft, isRight, fadeOut}:{isUp?:boolean, fadeOut?:boolean, isLeft?:boolean, isRight?:boolean}) => {
    return (
        <div className={`absolute top-9 right-  flex flex-col justify-center  gap-x-2 text-current text-center text-xs  opacity-50 ${fadeOut ? style.fadeOut : ''} `}>
            <ArrowUp className={'self-center text-wrap'} />
            <h5 className={'text-wrap'}>Ещё вы можете посмотреть статистику по навыкам.</h5>
        </div>
    );
};

export default TableSwitchTips;