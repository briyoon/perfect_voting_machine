import type { FunctionComponent } from "react";
import { useContext, useState } from "react";
import { BallotContext } from "@/Ballot";

interface PropositionProps {
    proposition: Proposition
}

const Proposition: FunctionComponent<PropositionProps> = ({ proposition }) => {

    const { currentChoice, setCurrentChoice } = useContext(BallotContext);
    
    const handleCurrChoice = (choice: any) => {
        console.log(choice);
        setCurrentChoice(choice);
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">{proposition.propName}</h2>
            <p className="mb-4">{proposition.propDescription}</p>
            <ul>
            {proposition.propChoices.map((choice, index) => (
                <li onClick = {() => handleCurrChoice(choice.option)} key={index} className="mb-2">
                <label className="inline-flex items-center">
                    <input type="radio" name={`proposition_${index}`} value={index} className="form-radio h-4 w-4 text-indigo-600" />
                    <span className="ml-2">{choice.option}</span>
                </label>
                </li>
            ))}
            </ul>
        </>
    );
}

export default Proposition;