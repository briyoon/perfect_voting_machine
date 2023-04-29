import type { FunctionComponent } from "react";
import { useContext, useState } from "react";
import { BallotContext } from "@/Ballot";

interface RankedChoiceProps {
    rankedChoice: RankedChoice
}

const RankedChoice: FunctionComponent<RankedChoiceProps> = ({ rankedChoice }) => {

    const { currentChoice, setCurrentChoice } = useContext(BallotContext);
    
    const handleCurrChoice = (choice: any) => {
        console.log(choice);
        setCurrentChoice(choice);
    }


    return(
        <>
            <h2 className="text-2xl font-bold mb-4">{rankedChoice.rankedChoiceName}</h2>
            <form>
            <ul>
                {rankedChoice.rankedChoices.map((choice, index) => (
                    <li onClick = {() => handleCurrChoice(choice.candidate.name)} key={index} className="mb-2">
                        <input type="radio" name={`rankedChoice_${index}`} value={index} className="form-radio h-4 w-4 text-indigo-600" />
                        <span> {choice.candidate.name} - {choice.candidate.party}</span>
                    </li>
                 ))}
            </ul>
            </form>
        </>

    );
}

export default RankedChoice;