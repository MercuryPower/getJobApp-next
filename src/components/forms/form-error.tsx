import React from 'react';

interface FormErrorProps{
    message?:string;
}

const FormError = ({message}:FormErrorProps) => {
    if (!message) return null
    return (
        <div className={'text-red-400 gap-x-2 bg-destructive p-2  flex rounded-md text-sm'}>
            <p>{message}</p>
        </div>
    );
};

export default FormError;