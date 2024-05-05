import React from 'react';
import Image from "next/image";

const KeyFeaturesSection = () => {
    return (
        <section>
            <div className={'flex justify-center gap-12 self-center '}>
                <div className={'bg-green-600  w-80 pb-24 h-auto flex pt-24 justify-end flex-col rounded mt-12 shadow '}>
                    <div className={'flex flex-col self-center'}>
                        <Image
                            src="/statistics.png"
                            alt="Logo"
                            className={'self-center m-2 dark:invert'}
                            width={100}
                            height={50}
                        />
                        <h2 className={'text-3xl self-center p-2 font-black rounded-2xl m-2'}>Статистика</h2>
                        <p className={'p-2 rounded-2xl mt-2 border-b-black text-center opacity-80'} >Подберем всю необходимую статистику релевантности определенного направления.</p>
                    </div>
                </div>
                <div className={'bg-green-600 w-80  pt-24 pb-24  flex justify-center flex-col rounded mt-6 shadow p-4 '}>
                    <div className={'flex flex-col self-center'}>
                        <Image
                            src="/recomendation.svg"
                            alt="Logo"
                            className={'self-center m-2 dark:invert  '}
                            width={100}
                            height={50}
                        />
                        <h2 className={'text-3xl text-center p-2 font-black  rounded-2xl m-2'}>Система рекомендаций</h2>
                        <p className={'p-2  rounded-2xl mt-2 border-b-black text-center opacity-80'} >Системы рекомендаций проводят анализ предпочтений в той или иной профессии и стараются предсказать, какие  могут стать востребованными в будущем.</p>
                    </div>
                </div>
                <div className={'bg-green-600 w-80 flex pt-24 pb-24 justify-start flex-col rounded shadow p-4 '}>
                    <div className={'flex flex-col self-center'}>
                        <Image
                            src="/update.svg"
                            alt="Logo"
                            className={'self-center m-2 dark:invert '}
                            width={100}
                            height={50}
                        />
                        <h2 className={'text-3xl  self-center p-2 font-black  rounded-2xl m-2 text-center'}>Актуальность</h2>
                        <p className={'p-2  rounded-2xl mt-2 border-b-black text-center opacity-80'} >Все данные своевременно  выгружаются, что позволяет собирать только актуальную и свежую информацию по всем вакансиям и специалистам </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KeyFeaturesSection;