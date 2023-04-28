import * as React from 'react';
import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export default function BallotComp() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [ballotData, setBallotData] = useState<Ballot | null>(null);

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setBallotData(data))
      .catch(error => console.error(error));
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

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">{ballotData.header.title}</h1>
      <p className="mb-4">{ballotData.header.instructions}</p>
      <p className="mb-4">{`Current section: ${currentSection.sectionName}`}</p>
      <button onClick={handlePrev} disabled={currentSectionIndex === 0 && currentItemIndex === 0}>Previous</button>
      <button onClick={handleNext} disabled={currentSectionIndex === ballotData.sections.length - 1 && currentItemIndex === currentSection.items.length - 1}>Next</button>
      {currentItem.contest && (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">{currentItem.contest.contestName}</h2>
        <ul>
          {currentItem.contest.contestChoices.map((choice, index) => (
            <li key={index} className="mb-2">
              <label className="inline-flex items-center">
                <input type="radio" name={`contest_${currentItemIndex}`} value={index} className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2">{choice.candidate.name} ({choice.candidate.party})</span>
              </label>
            </li>
          ))}
          {currentItem.contest.contestWriteIn && (
            <li className="mb-2">
              <label className="inline-flex items-center">
                <input type="radio" name={`contest_${currentItemIndex}`} value="write-in" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2">Write-in</span>
              </label>
              <input type="text" placeholder="Candidate name" className="ml-4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </li>
          )}
        </ul>
      </div>
    )}
    {currentItem.proposition && (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">{currentItem.proposition.propName}</h2>
        <p className="mb-4">{currentItem.proposition.propDescription}</p>
        <ul>
          {currentItem.proposition.propChoices.map((choice, index) => (
            <li key={index} className="mb-2">
              <label className="inline-flex items-center">
                <input type="radio" name={`proposition_${currentItemIndex}`} value={index} className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2">{choice.option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    )}
    {currentItem.rankedChoice && (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">{currentItem.rankedChoice.rankedChoiceName}</h2>
        <ul>
          {currentItem.rankedChoice.rankedChoices.map((choice, index) => (
            <li key={index} className="mb-2">
              <span>{choice.candidate.name} - {choice.candidate.party}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
    );
}
