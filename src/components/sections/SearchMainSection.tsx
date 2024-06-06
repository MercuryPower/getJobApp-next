'use client'
import React, {memo, useCallback, useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import {useIsEmployer} from "@/components/providers";
import {useRouter} from "next/navigation";

const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
    ssr: false
});
const SearchMainSection = () => {
    const [totalCompanies, setTotalCompanies] = useState<number | undefined>()
    const [totalVacancies, setTotalVacancies] = useState()
    const [totalResumes, setTotalResumes] = useState()

    useEffect(() => {
        const fetchCounts = async () => {
            try{
                const response = await fetch('http://127.0.0.1:8000/tests/get_stats_for_main_page',
                    {
                        cache:'force-cache',
                        next:{revalidate:3600},
                    })
                const data = await response.json()
                setTotalCompanies(data.totalCompanies);
                setTotalVacancies(data.totalVacancies);
                setTotalResumes(data.totalResumes);
            }catch(e){
                throw new Error((e as Error).message)
            }
        }
        void fetchCounts();
    }, [])
    const router = useRouter();
    const {isEmployer} = useIsEmployer();
    const [jobsList, setJobList] = useState([
        'DevOps',
        'Frontend',
        'Backend',
        'Project Manager',
        'Lead',
        'Java Developer',
        'Python Developer',
        'Kotlin Developer',
        'Swift Developer',
        'QA-engineer'
    ]);
    const [loopNum, setLoopNum] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [text, setText] = useState('')
    const [delta, setDelta] = useState(300 - Math.random() * 100)
    const tick = useCallback(() => {
        let i = loopNum % jobsList.length;
        let fullText = jobsList[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - text.length) :  fullText.substring(0, text.length + 1)
        setText(updatedText)
        if(isDeleting){
            setDelta(300)
        }
        if(!isDeleting && updatedText === fullText){
            setIsDeleting(true)
            setDelta(2000)
        } else if(isDeleting &&  updatedText === ''){
            setIsDeleting(false)
            setLoopNum(loopNum + 1)
            setDelta(250);
        }
    }, [isDeleting, jobsList, loopNum, text.length])
    useEffect(()=>{
        let ticker = setInterval(()=>{
            tick();
        }, delta, tick)
        return () => {clearInterval(ticker)}
    }, [text, delta, tick])
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`${isEmployer ? `vacancies/?query=${inputValue}`: `jobseekers/?query=${inputValue}`}`)
    };

    return (
        <section>
            <div className={'flex flex-col items-center justify-center m-48'}>
                {/*<div>*/}
                {/*    <Image*/}
                {/*        className={'-z-10 object-cover'}*/}
                {/*        src={'/patternGeometry.jpg'}*/}
                {/*        alt={'backgroundImage'}*/}
                {/*        fill={true}*/}
                {/*    />*/}
                {/*</div>*/}
                <h1 className={'text-8xl m-2 font-bold'}>Подберем</h1>
                <div className={'flex gap-10'}>
                    <div className={'flex'}>
                        {isEmployer ?
                            <h1  className={'text-8xl font-bold text-green-600 '}>лучших</h1> :
                            <h1  className={'text-8xl font-bold text-green-600 '}>лучшую</h1> }
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={'flex self-center m-4 mt-7 h-14 rounded'}>
                            <input onChange={handleInputChange}
                                   onSubmit={() => router.push(`${isEmployer ? `vacancies/?query=${inputValue}` : `jobseekers/?query=${inputValue}`}`)}
                                   className={'w-96 flex p-2 text-xl rounded-l '} placeholder={`${text}`}></input>
                            <button type={'submit'}
                                    className={'flex text-white bg-green-600 p-4 gap-1 rounded-r-lg self-center font-bold hover:opacity-70 transition'}>
                                <svg className={'flex self-center '} width="23" height="22" viewBox="0 0 23 22"
                                     fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.58335 3.6667C8.05836 3.6667 6.59582 4.24616 5.51749 5.27761C4.43916 6.30906 3.83335 7.70801 3.83335 9.1667C3.83335 10.6254 4.43916 12.0243 5.51749 13.0558C6.59582 14.0872 8.05836 14.6667 9.58335 14.6667C11.1083 14.6667 12.5709 14.0872 13.6492 13.0558C14.7276 12.0243 15.3334 10.6254 15.3334 9.1667C15.3334 7.70801 14.7276 6.30906 13.6492 5.27761C12.5709 4.24616 11.1083 3.6667 9.58335 3.6667ZM1.91669 9.1667C1.91686 7.99965 2.20823 6.8495 2.76657 5.81183C3.32492 4.77415 4.13412 3.87893 5.12692 3.20056C6.11972 2.52218 7.26744 2.08025 8.47471 1.91149C9.68198 1.74273 10.9139 1.85201 12.0682 2.23026C13.2224 2.6085 14.2656 3.24478 15.111 4.08622C15.9565 4.92766 16.5798 5.94996 16.9291 7.06815C17.2784 8.18634 17.3437 9.36813 17.1195 10.5153C16.8953 11.6625 16.3881 12.7419 15.64 13.6639L20.8026 18.6019C20.9771 18.7748 21.0737 19.0064 21.0715 19.2467C21.0694 19.4871 20.9686 19.717 20.7909 19.8869C20.6132 20.0569 20.3728 20.1533 20.1216 20.1554C19.8703 20.1575 19.6282 20.0651 19.4475 19.8981L14.2849 14.96C13.1517 15.8016 11.7942 16.3221 10.367 16.4624C8.93984 16.6027 7.50012 16.3571 6.2116 15.7536C4.92308 15.15 3.83747 14.2127 3.07821 13.0483C2.31896 11.8839 1.91653 10.539 1.91669 9.1667Z"/>
                                </svg>
                                Найти
                            </button>
                        </div>
                    </form>

                </div>
                {isEmployer ?
                    <h1 className={'text-8xl font-bold m-2'}>специалистов</h1>
                    : <h1 className={'text-8xl font-bold m-2'}>компанию</h1>}
            </div>
            <div className={'flex  justify-center gap-12'}>
                <div className={'w-80  flex justify-center self-end text-center'}>
                    <h2>
                        <span className={'font-bold flex flex-col text-center text-4xl'}>
                            <AnimatedNumbers
                                includeComma
                                transitions={(index) => ({
                                    type: "spring",
                                    duration: index + 1,
                                })}
                                animateToNumber={totalVacancies || 1250}
                            />
                        </span> Доступных вакансий</h2>
                </div>
                <div className={'w-80 flex justify-center self-end text-center mb-4'}>
                    <h2>
                            <span className={'font-bold self-center flex flex-col text-center text-4xl '}>
                                <AnimatedNumbers
                                    includeComma
                                    transitions={(index) => ({
                                        type: "spring",
                                        duration: index + 1,
                                    })}
                                    animateToNumber={totalResumes || 1105}
                                />
                            </span> Доступных резюме</h2>
                </div>
                <div className={'w-80 flex justify-center self-end text-center mb-8'}>
                    <h2>
                        <span className={'font-bold self-center flex flex-col text-center text-4xl transition-all '}>
                            <AnimatedNumbers
                                includeComma
                                transitions={(index) => ({
                                    type: "spring",
                                    duration: index + 0.1,
                                })}
                                animateToNumber={totalCompanies || 94}
                            />
                        </span>  Компаний уже с нами</h2>
                </div>
            </div>
        </section>
    );
};

export default SearchMainSection;