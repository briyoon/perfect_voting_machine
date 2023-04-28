import type { FunctionComponent } from "react";
import { useState } from "react";

interface ApprovalProps {
    approval: Approval
}

const Approval: FunctionComponent<ApprovalProps> = ({ approval }) => {
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