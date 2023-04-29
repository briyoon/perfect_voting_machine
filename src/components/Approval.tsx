import type { FunctionComponent } from "react";
import { useContext, useState } from "react";
import { BallotContext } from "@/Ballot";

interface ApprovalProps {
    approval: Approval
}

const Approval: FunctionComponent<ApprovalProps> = ({ approval }) => {

    const { contextChoices: choices, setContextChoices: setChoices } = useContext(BallotContext);


    return(
        <>
            <h2 className="text-2xl font-bold mb-4">{approval.approvalName}</h2>
            <ul>
                {approval.approvalChoices.map((choice, index) => (
                    <li key={index} className="mb-2">
                        <span>{choice.candidate.name} - {choice.candidate.party}</span>
                    </li>
                    ))}
            </ul>
        </>
    );
}

export default Approval;