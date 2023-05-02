import type { FunctionComponent } from "react";
import { useContext, useState } from "react";
import { BallotContext } from "@/Ballot";

interface ContestProps {
    contest: Contest
}

const Contest: FunctionComponent<ContestProps> = ({ contest }) => {

    const { currentChoice, setCurrentChoice } = useContext(BallotContext);
    
    const handleCurrChoice = (choice: any) => {
        console.log(choice);
        //if(contest.contestChoices.indexOf(choice) === -1)
         setCurrentChoice(choice);
    }

    const handleWriteIn = (event: any) => {
        setCurrentChoice(event.target.value)
    }


    return (
        <>
            <h2 className="text-2xl font-bold mb-4">{contest.contestName}</h2>
            <ul>
            {contest.contestChoices.map((choice, index) => (
                <li onClick = {() => handleCurrChoice(choice.candidate.name)} key={index} className="mb-2">
                <label className="inline-flex items-center">
                    <input type="radio" name="contest" value={index} className="form-radio h-4 w-4 text-indigo-600" />
                    <span className="ml-2">{choice.candidate.name} ({choice.candidate.party})</span>
                </label>
                </li>
            ))}
            {contest.contestWriteIn && (
                <li className="mb-2">
                <label className="inline-flex items-center">
                    <input type="radio" name="contest" value="write-in" className="form-radio h-4 w-4 text-indigo-600" />
                    <span className="ml-2">Write-in</span>
                </label>
                <input onChange = {handleWriteIn} type="text" placeholder="Candidate name" className="ml-4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </li>
            )}
            </ul>
        </>
    );
}

export default Contest;