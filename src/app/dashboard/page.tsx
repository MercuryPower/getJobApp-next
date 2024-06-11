import React from 'react';
import {useAuth} from "@/providers";
import notFound from "@/app/not-found";

const Page = () => {
    const {user} = useAuth()

    if(!user?.is_superuser){
        return notFound();
    }
    return (
        <div>

        </div>
    );
};

export default Page;