import { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import * as React from 'react';
import logo from './logo.png';

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

var listenKeys = new Set()
listenKeys.add('ArrowRight')
listenKeys.add('ArrowLeft')
listenKeys.add('Enter')

function App() {
  const [count, setCount] = useState(0)
  const [ballot, setBallot] = useState(null)
  const [hash, setHash] = useState(null as null | string)

  return (
    <div className="bg-gradient-to-tr from-green-500 to-blue-300 min-h-screen flex flex-col justify-center items-center">
      <img src={logo} alt="Logo" className="w-1/3 h-auto mb-4" />
      <ul className='w-full h-full flex flex-col justify-center items-center'>
        <li className='bg-white rounded-xl shadow-md w-1/3 h-[12%] m-4 text-xl flex justify-center items-center transition duration-300 transform hover:bg-gray-300 hover:shadow-lg hover:cursor-pointer hover:scale-110'>
          <Link to='/gethash' className="block w-full h-full text-center py-4">Get Hash</Link>
        </li>
        <li className='bg-white rounded-xl shadow-md w-1/3 h-[12%] m-4 text-xl flex justify-center items-center transition duration-300 transform hover:bg-gray-300 hover:shadow-lg hover:cursor-pointer hover:scale-110'>
          <Link to='/ballot' className="block w-full h-full text-center py-4">Ballot</Link>
        </li>
      </ul>
    </div>
  )
}

export default App
