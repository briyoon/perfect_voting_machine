import * as React from 'react';
import type { FunctionComponent } from "react";
import { useContext, useState } from "react";

interface PrinterDriverProps {
    ballotItems: string[],
    ballotChoices: string[]
}

const PrinterDriver: FunctionComponent<PrinterDriverProps> = ({ ballotItems, ballotChoices }) => {

    // const element = document.createElement("a");
    // const fileContent = ballotChoices.join('\n'); // join the ballot choices with new lines
    // const file = new Blob([fileContent], {type: 'text/plain'}); // create a Blob with the ballot choices
    const [fileContent, setFileContent] = useState([""]);

    console.log('Inside BallotReview');

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          console.log('CONFIRMED');
          event.preventDefault();
          downloadFile();
        } else if (event.key === "ArrowUp") {
          console.log('up pressed');
          event.preventDefault();
          uploadToFile();
        }
      };

      function uploadToFile() {
        setFileContent(fileContent.concat(ballotChoices));
        //element.download = "ballotData.txt";
        //element.click();
      }

    //   function downloadFile() {
    //     const element = document.createElement("a");
    //     const fileContent = ballotChoices.join('\n'); // join the ballot choices with new lines
    //     const file = new Blob([fileContent], {type: 'text/plain'}); // create a Blob with the ballot choices
    //     element.href = URL.createObjectURL(file);
    //     element.download = "ballotData.txt";
    //     element.click();
    //   }
    function downloadFile() {
        const fileUrl = 'ballotData.txt';
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', fileUrl, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // file exists, do nothing
              console.log('File already exists');
            } else {
              // file does not exist, create new one
              const element = document.createElement("a");
              const file = new Blob([fileContent], {type: 'text/plain'});
              element.href = URL.createObjectURL(file);
              element.download = "ballotData.txt";
              for(let i = 0; i < ballotChoices.length; i++){
                  const textNode = document.createTextNode(ballotChoices[i] + "");
                  document.body.appendChild(textNode);
              }
              element.click();
            }
          }
        };
        xhr.send(null);
    }
      
      

    const renderItems = () => {
        const items = [];
        for(let i = 0; i < ballotItems.length; i++){
            items.push(
                <>
                    <h2 className="text-2xl font-bold mb-4">{ballotItems[i]}</h2>
                    <ul>
                        <li key={i} className="mb-2">
                        <label className="inline-flex items-center">
                            <span className="ml-2">{ballotChoices[i]}</span>
                        </label>
                        </li>
                    </ul>
                </>
            )
        }
        return items;
    }

    return (
        <>
            <div className="bg-gradient-to-tr from-green-500 to-blue-300 min-h-screen flex items-center justify-center" tabIndex={0} onKeyDown={handleKeyPress}>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                    <div className="mb-4">
                        <p className="font-bold text-black text-center text-2xl">Ballot Summary</p>
                        <p className="text-black text-center text-lg">Please review your ballot and ensure the selections are accurate</p>
                    </div>
                    <ul>
                        {renderItems()}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default PrinterDriver;