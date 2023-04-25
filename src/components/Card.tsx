import React, { FunctionComponent } from 'react';

interface CardProps {
    title: string;
    description: string;
    date: string;
}

const Card: FunctionComponent<CardProps> = ({title, description, date}) => {
    return (
        <div className='bg-white flex flex-col m-4 w-2/5 h-2/5 rounded-xl shadow-xl text-green-600 px-4'>
            <h1 className='py-2 bg-red-500 rounded-xl'>{title}</h1>
            <p className='text-black'>{description}</p>
            <p className='mt-auto mb-2 align'>{date}</p>
        </div>
    );
}

export default Card;