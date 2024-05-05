import Link from "next/link";
import Navbar from "@/components/Navbar";
import AnimatedNumbers from "react-animated-numbers";
import Image from "next/image";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SearchMainSection from "@/components/sections/SearchMainSection";
import VacancyForm from "@/components/VacancyForm";
import KeyFeaturesSection from "@/components/sections/KeyFeaturesSection";
export default function Home() {
  return (
    <main>
        <SearchMainSection />
        <KeyFeaturesSection />
      <section>
        <div className={'flex flex-col m-24 p-2 '}>
          <h1 className={'text-4xl font-light'}>| 01 <span className={' p-2 font-bold text-3xl '}>Создайте необходимую вакансию</span></h1>
            <VacancyForm />
        </div>
        <div className={'flex m-24 p-2 '}>
          <h1 className={'text-4xl font-light'}>| 02 <span className={'p-2 font-bold text-3xl '}>Посмотрите рекомендации для вас</span></h1>
        </div>
        <div className={'flex m-24 p-2 '}>
          <h1 className={'text-4xl font-light'}>| 03  <span className={'p-2 font-bold text-3xl '}>Почти готово!</span> <span className={'text-xl text-center'}>Вы можете посмотреть статистику о востребованности профессии внизу.</span></h1>
        </div>
      </section>
    </main>
  );
}
