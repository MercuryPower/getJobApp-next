import React from 'react';
interface FormSuccessProps{
    message?:string;
}
const FormSuccess = ({message}:FormSuccessProps) => {
    if(!message) return null
    return (
        <div className={'gap-x-2 text-green-600 bg-green-600/30 p-2  flex rounded-md text-sm'}>
            <p>{message}</p>
        </div>
    );
};


export default FormSuccess;