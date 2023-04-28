import * as React from 'react';
import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Contest from './components/Contest';
import Proposition from './components/Proposition';
import RankedChoice from './components/RankedChoice';
import Approval from './components/Approval';

export default function BallotComp() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [ballotData, setBallotData] = useState<Ballot | null>(null);
  const [choices, setChoices] = useState<any[]>([]);

  // const idk = (data, index) => {
  //   if choices[index] === undefined {
  //     choices[index] = data;
  //   }
  //   else
  // }


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
    } else if (currentSectionIndex < ballotData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentItemIndex(0);
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

  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="">
        <p className="font-bold">{ballotData.header.title}</p>
        <p className="">{`Current section: ${currentSection.sectionName}`}</p>
        <p className="">{ballotData.header.instructions}</p>
      </div>
      <div className="flex-grow pt-48 w-full h-full flex flex-col items-center">
        {renderCurrentItem()}
      </div>
      <div className="flex flex-row justify-end items-center ">
        <button className="mx-4" onClick={handlePrev} disabled={currentSectionIndex === 0 && currentItemIndex === 0}>
          Previous
        </button>
        <button className="mx-4" onClick={handleNext} disabled={currentSectionIndex === ballotData.sections.length - 1 && currentItemIndex === currentSection.items.length - 1}>
          Next
        </button>
      </div>
    </div>

  );
}
