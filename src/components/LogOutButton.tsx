import React, {useEffect} from 'react';
import {Button} from "@/components/ui/button";

const LogOutButton = () => {
    const logOut = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/auth/jwt/logout`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                localStorage.removeItem('token');
                window.location.reload();
            } else {
                console.error('Error logging out:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div>
            <Button onClick={logOut} size={"lg"}  className={'h-12 p-4 flex justify-center self-center border-black bg-green-600 rounded  font-bold  transition'} >
                <svg className={'mr-2 self-center dark:invert'} width="15" height="15" viewBox="0 0 15 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50006 6.875C7.99451 6.875 8.47786 6.72838 8.88899 6.45368C9.30011 6.17897 9.62054 5.78853 9.80976 5.33171C9.99898 4.87489 10.0485 4.37223 9.95202 3.88728C9.85556 3.40232 9.61746 2.95687 9.26783 2.60723C8.9182 2.2576 8.47274 2.0195 7.98779 1.92304C7.50283 1.82657 7.00017 1.87608 6.54335 2.0653C6.08654 2.25452 5.69609 2.57495 5.42139 2.98608C5.14668 3.3972 5.00006 3.88055 5.00006 4.375C5.00006 5.03804 5.26345 5.67393 5.73229 6.14277C6.20113 6.61161 6.83702 6.875 7.50006 6.875Z"/>
                    <path d="M11.2501 13.125C11.4158 13.125 11.5748 13.0591 11.692 12.9419C11.8092 12.8247 11.8751 12.6657 11.8751 12.5C11.8751 11.3397 11.4141 10.2269 10.5937 9.40639C9.77318 8.58592 8.66038 8.12498 7.50006 8.12498C6.33974 8.12498 5.22694 8.58592 4.40647 9.40639C3.586 10.2269 3.12506 11.3397 3.12506 12.5C3.12506 12.6657 3.19091 12.8247 3.30812 12.9419C3.42533 13.0591 3.5843 13.125 3.75006 13.125H11.2501Z"/>
                </svg>
                <span>Выйти</span>
            </Button>
        </div>
    );
};

export default LogOutButton;