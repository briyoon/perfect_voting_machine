import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Contest from './components/Contest';
import Proposition from './components/Proposition';
import RankedChoice from './components/RankedChoice';
import Approval from './components/Approval';


type BallotContextType = {
  contextChoices: any [],
  setContextChoices: React.Dispatch<React.SetStateAction<any[]>>,
}

export const BallotContext = React.createContext<BallotContextType>({
  contextChoices: [],
  setContextChoices: (choice) => {},
});

export default function BallotComp() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [ballotData, setBallotData] = useState<Ballot | null>(null);
  const [choices, setChoices] = useState<any[]>([]);
  const [contextChoices, setContextChoices] = useState<any[]>([])

  useEffect(() => {
    const fetchBallot = async () => {
      const response = await fetch('src/assets/example_ballot.json')
      const data = await response.json()
      setBallotData(data)
    }

    fetchBallot()
  }, []);

  if (!ballotData) {
    return <div>Loading...</div>;
  }

  const currentSection = ballotData.sections[currentSectionIndex];
  const currentItem = currentSection.items[currentItemIndex];

  const handleNext = () => {
    if (currentItemIndex < currentSection.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      handleAddChoice
    } else if (currentSectionIndex < ballotData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentItemIndex(0);
      handleAddChoice
    }
  };
  const handlePrev = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentItemIndex(ballotData.sections[currentSectionIndex - 1].items.length - 1);
    }
  };

  const renderCurrentItem = () => {
    if (currentItem.contest) {
      return <Contest contest={currentItem.contest} />
    }
    else if (currentItem.proposition) {
      return <Proposition proposition={currentItem.proposition} />
    }
    else if (currentItem.rankedChoice) {
      return <RankedChoice rankedChoice={currentItem.rankedChoice} />
    }
    else if (currentItem.approval) {
      return <Approval approval={currentItem.approval} />
    }
    else {
      return <div>Invalid item type</div>
    }
  }

  const handleAddChoice = (choice: any) => {
    setContextChoices((prevState) => {
          if(contextChoices.indexOf(choice) === -1){
            console.log([...prevState, choice])
            return [...prevState, choice]
          } else {
            const index = prevState.indexOf(choice);
            prevState[index] = choice;
            console.log([...prevState])
            return [...prevState];
          }
        }
    )
  };

  return (
      <div className="bg-gradient-to-tr from-green-500 to-blue-300 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="mb-4">
            <p className="font-bold text-black text-center text-2xl">{ballotData.header.title}</p>
            <p className="text-black text-center text-lg">{`Current section: ${currentSection.sectionName}`}</p>
            <p className="text-black text-center text-lg">{ballotData.header.instructions}</p>
          </div>
          <hr className="border-t-2 border-gray-200 mb-4 mx-auto w-2/3" />
          <div className="flex-grow w-full h-full flex flex-col items-center">
          <BallotContext.Provider value={{ contextChoices, setContextChoices: handleAddChoice}}>
            {renderCurrentItem()}
          </BallotContext.Provider>  
          </div>
          <div className="flex flex-row justify-center items-center mt-4">
            <button className="bg-white border border-gray-300 rounded-full shadow-md w-40 h-[12%] m-4 text-2xl flex justify-center items-center transition duration-300 transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-4" onClick={handlePrev} disabled={currentSectionIndex === 0 && currentItemIndex === 0}>
              Previous
            </button>
            <button className="bg-white border border-gray-300 rounded-full shadow-md w-40 h-[12%] m-4 text-2xl flex justify-center items-center transition duration-300 transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-4" onClick={handleNext} disabled={currentSectionIndex === ballotData.sections.length - 1 && currentItemIndex === currentSection.items.length - 1}>
              Next
            </button>
          </div>
        </div>
      </div>
  );
}
