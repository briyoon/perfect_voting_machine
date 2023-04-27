import React from 'react';
import logo from './logo.png'; // Import the logo image
const { ipcRenderer } = window.require('electron');

const Login: React.FC = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [hash, setHash] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHash(`${firstName}${lastName}`);
    // ipcRenderer.invoke('hash-data', data).then((result) => {
    //   setHash(result);
    //   console.log(`Hash value: ${result}`);
    // }).catch((error) => {
    //   console.error(error);
    // });
  };

  return (
    <div className="bg-gradient-to-tr from-green-500 to-blue-300 min-h-screen flex items-center justify-center">
      <img src={logo} alt="Logo" className="absolute bottom-4 right-4 h-16 w-auto"/>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="first-name">
              First Name:
            </label>
            <input
              className="w-full p-2 text-lg border-b-4 border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0 transition duration-500"
              id="first-name"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="last-name">
              Last Name:
            </label>
            <input
              className="w-full p-2 text-lg border-b-4 border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0 transition duration-500"
              id="last-name"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full text-lg bg-gradient-to-r from-green-500 to-blue-300 text-white font-semibold py-3 px-4 rounded-full focus:outline-none hover:from-green-600 hover:to-blue-400 transition duration-300">
            Submit
          </button>
        </form>
        {hash && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 font-bold text-xl">Hash value:</p>
            <p className="text-gray-700 text-lg">{hash}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;