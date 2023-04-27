import * as React from 'react';
import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

// interface BallotQuestionProps{
//     Instructions : String;
//     Type : String;
//     Question : String;
//     Options : [String];
// }


// const BallotComponent = () => {
    

//     const [ballotData, setBallotData] = useState([])

//     useEffect (() => {
//         fetch('ballot.json')
//             .then (response => response.json())
//             .then(BallotQuestion => setBallotQuestions(BallotQuestion))
//     }, [])

//     const listBallotQuestions = BallotQuestion.map(item  => (
//         <BallotQuestion instructions={item.instructions} type={item.type} question={item.question} options={item.options}/>
//     ))
// };

// const BallotQuestion = ({instructions, type, question, options}) => (
//     <li>
//         {instructions}, {type}, {question}, {options}
//     </li>
// );

// BallotQuestion.propTypes = {
//     instructions: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     question: PropTypes.string.isRequired,
//     options: PropTypes.array.isRequired,
// }

// interface BallotProps {
//     BallotQuestions : [BallotQuestionProps]
// }

interface BallotData {
    header: {
      date: string;
      instructions: string;
      title: string;
    };
    sections: Section[];
  }

interface Section {
    items : Item[];
    sectionName : string;
}

interface Item {
    type: 'contest' | 'proposition' | 'rankedChoice' | 'approval';
    content: Contest | Proposition | RankedChoice | Approval;
  }

interface Contest {
    contestName: string;
    contestVoteFor: number;
    contestWriteIn: boolean;
    contestChoices: ContestChoice[];
}
  
interface ContestChoice {
    candidate: {
      name: string;
      party: string;
    };
}
  
interface Proposition {
    propName: string;
    propDescription: string;
    propChoices: PropChoice[];
}
  
interface PropChoice {
    option: string;
}
  
interface RankedChoice {
    rankedChoiceName: string;
    rankedChoiceVoteFor: number;
    rankedChoiceWriteIn: boolean;
    rankedChoices: RankedChoiceCandidate[];
}
  
interface RankedChoiceCandidate {
    candidate: {
        name: string;
        party: string;
    };
}
  
interface Approval {
    approvalName: string;
    approvalChoices: ApprovalChoice[];
}
  
interface ApprovalChoice {
    candidate: {
      name: string;
      party: string;
    };
}

function getBallotItems(ballotData: BallotData ){
    const items = [];
    ballotData.sections.forEach((section: Section) =>{
        section.items.forEach((item: Item) => {
            items.push(item)
        })
    })
}
  

const Ballot: React.FunctionComponent<Item> = () => {
    return (
        <div>
            <h1>Ballot View</h1>
        </div>
    );
}

export default Ballot;