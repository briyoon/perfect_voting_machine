import * as React from 'react';


interface BallotQuestionProps{
    Instructions : String;
    Question : String;
    Options : [String];
}

interface BallotProps {
    BallotQuestions : [BallotQuestionProps]
}

const Ballot: React.FunctionComponent<BallotProps> = () => {
    return (
        <div>
            <h1>Ballot View</h1>
        </div>
    );
}

export default Ballot;