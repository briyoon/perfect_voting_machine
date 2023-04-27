import React, { useState } from 'react';
const { ipcRenderer } = window.require('electron');

function NameForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hash, setHash] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { firstName, lastName };
    setHash(`${firstName}${lastName}`)
    // ipcRenderer.invoke('hash-data', data).then((result) => {
    //   setHash(result);
    //   console.log(`Hash value: ${result}`);
    // }).catch((error) => {
    //   console.error(error);
    // });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Name Form</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" for="first-name">
            First Name:
          </label>
          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" for="last-name">
            Last Name:
          </label>
          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
      {hash && (
        <div className="mt-8">
          <p className="text-gray-700 font-bold">Hash value:</p>
          <p className="text-gray-700">{hash}</p>
        </div>
      )}
    </div>
  );
}

export default NameForm;