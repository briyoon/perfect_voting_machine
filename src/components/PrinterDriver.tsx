import * as React from 'react';
import { FunctionComponent, useEffect, useRef } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ipcRenderer } from 'electron';

interface PrinterDriverProps {
    ballotItems: string[],
    ballotChoices: string[]
}

const PrinterDriver: FunctionComponent<PrinterDriverProps> = ({ ballotItems, ballotChoices }) => {

    // const element = document.createElement("a");
    // const fileContent = ballotChoices.join('\n'); // join the ballot choices with new lines
    // const file = new Blob([fileContent], {type: 'text/plain'}); // create a Blob with the ballot choices
    const [fileContent, setFileContent] = useState([""]);
    const tempBallotChoices = ballotChoices;

    console.log('Inside BallotReview');

    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          console.log('CONFIRMED');
          event.preventDefault();
          var itemData = ballotItems.map((item, index) => {
            return {item: item, choice: ballotChoices[index]}
          })

          console.log(itemData)

          ipcRenderer.send('save-object-to-file', itemData)

          ipcRenderer.on('save-object-to-file-reply', (event, result) => {
            console.log(result)
            if (result.success) {
              console.log('Object saved successfully!')
            } else {
              console.error('Error saving object:', result.error)
            }
            navigate(-2);
          })
        } else if (event.key === "ArrowUp") {
          console.log('up pressed');
          event.preventDefault();
          uploadToFile();
        }
      };

      //Stores in RAM until ENTER is pressed
      function uploadToFile() {
        setFileContent(fileContent.concat());
        //element.download = "ballotData.txt";
        //element.click();
      }

    const renderItems = () => {
        const items = [];
        for(let i = 0; i < ballotItems.length; i++){
            const temp = ballotItems[i];
            items.push(
                <>
                    <h2 className="text-2xl font-bold mb-4">{temp}</h2>
                    <ul>
                        <li key={i} className="mb-2">
                        <label className="inline-flex items-center">
                            <span className="ml-2">{temp}</span>
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
            <div
                ref={containerRef}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
                onKeyDown={handleKeyPress}
                tabIndex={0}
            >
                <div className="mb-4">
                    <p className="font-bold text-black text-center text-2xl">Ballot Summary</p>
                    <p className="text-black text-center text-lg">Please review your ballot and ensure the selections are accurate</p>
                </div>
                <ul>
                    {renderItems()}
                </ul>
            </div>
        </>
    );
}

export default PrinterDriver;
