import type { FunctionComponent } from "react";
import { useState } from "react";


interface RankedChoiceProps {
    rankedChoice: RankedChoice
}

const RankedChoice: FunctionComponent<RankedChoiceProps> = ({ rankedChoice }) => {
    return(
        <>
            <h2 className="text-2xl font-bold mb-4">{rankedChoice.rankedChoiceName}</h2>
            <form>
            <ul>
                {rankedChoice.rankedChoices.map((choice, index) => (
                    <li key={index} className="mb-2">
                    <span>{choice.candidate.name} - {choice.candidate.party}</span>
                    </li>
                 ))}
            </ul>
            </form>
        </>

    );
}

export default RankedChoice;