import type { FunctionComponent } from "react";
import { useContext, useState } from "react";
import { BallotContext } from "@/Ballot";

interface ApprovalProps {
    approval: Approval
}

const Approval: FunctionComponent<ApprovalProps> = ({ approval }) => {

    const { currentChoice, setCurrentChoice } = useContext(BallotContext);

    const handleCurrChoice = (choice: any) => {
        console.log(choice);
        setCurrentChoice(choice);
    }


    return(
        <>
            <h2 className="text-2xl font-bold mb-4">{approval.approvalName}</h2>
            <ul>
                {approval.approvalChoices.map((choice, index) => (
                    <li onClick = {() => handleCurrChoice(choice.candidate.name)} key={index} className="mb-2">
                        <input type="radio" name={`approval_${index}`} value={index} className="form-radio h-4 w-4 text-indigo-600" />
                        <span> {choice.candidate.name} - {choice.candidate.party}</span>
                    </li>
                    ))}
            </ul>
        </>
    );
}

export default Approval;