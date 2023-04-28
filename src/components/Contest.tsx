import type { FunctionComponent } from "react";
import { useState } from "react";

interface ContestProps {
    contest: Contest
}

const Contest: FunctionComponent<ContestProps> = ({ contest }) => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">{contest.contestName}</h2>
            <ul>
            {contest.contestChoices.map((choice, index) => (
                <li key={index} className="mb-2">
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
                <input type="text" placeholder="Candidate name" className="ml-4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </li>
            )}
            </ul>
        </>
    );
}

export default Contest;