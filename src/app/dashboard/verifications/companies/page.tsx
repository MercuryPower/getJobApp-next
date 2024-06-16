'use client'
import React, {useEffect, useState} from 'react';
import {Statistics} from "@/components/tables/Statistics";
import {VerificationProps} from "@/types/types";
import {GET_VERIFICATION_COMPANY_NAME, GET_VERIFICATIONS_SKILLS} from "@/url/urls";
import notFound from "@/app/not-found";
import {useAuth} from "@/providers";

const Page = () => {
    const {user} = useAuth();
    const [dataCompanyNames, setDataCompanyNames] = useState<VerificationProps[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchCompanyNamesVerifications = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(GET_VERIFICATION_COMPANY_NAME, {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json();
                setDataCompanyNames(data)
            } catch (e) {
                throw new Error((e as Error).message)
            }
            setIsLoading(false)
        }
        void fetchCompanyNamesVerifications()
    },[])
    if (!user?.is_superuser) {
        return notFound();
    }
    return (
        <div className={'flex flex-col items-center '}>
            <div className={'w-[1000px] space-y-4'}>
                <Statistics updateVerificationData={setDataCompanyNames} verifyTableType={'companyName'} isVerification data={dataCompanyNames}  />
            </div>

        </div>
    );
};

export default Page;