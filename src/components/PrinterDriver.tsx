import * as React from 'react';
import type { FunctionComponent } from "react";
import { useContext, useState } from "react";

interface PrinterDriverProps {
    ballotItems: string[],
    ballotChoices: string[]
}

const PrinterDriver: FunctionComponent<PrinterDriverProps> = ({ ballotItems, ballotChoices }) => {

    console.log('Inside BallotReview')

    const renderItems = () => {
        const items = [];
        for(let i = 0; i < ballotItems.length; i++){
            items.push(
                <>
                    <h2 className="text-2xl font-bold mb-4">{ballotItems[i]}</h2>
                    <ul>
                        <li key={i} className="mb-2">
                        <label className="inline-flex items-center">
                            <input type="radio" name="contest" value={i} className="form-radio h-4 w-4 text-indigo-600" />
                            <span className="ml-2">{ballotChoices[i]}</span>
                        </label>
                        </li>
                    </ul>
                </>
            )
        }
        return items;
    }

    return (
        <>
            <div className="bg-gradient-to-tr from-green-500 to-blue-300 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                    <div className="mb-4">
                        <p className="font-bold text-black text-center text-2xl">Ballot Summary</p>
                        <p className="text-black text-center text-lg">Please review your ballot and ensure the selections are accurate</p>
                    </div>
                    <ul>
                        {renderItems()}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default PrinterDriver;