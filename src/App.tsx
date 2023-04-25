import { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import * as React from 'react';

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
    <div className='w-screen h-screen bg-gray-500'>
      <ul className='w-full h-full flex flex-col justify-center items-center'>
        <li className='bg-white rounded-xl shadow-xl w-1/5 h-[10%] m-4 text-xl flex justify-center items-center hover:bg-gray-300 hover:cursor-pointer'>
          <Link to='/gethash'>GET HASH</Link>
        </li>
        <li className='bg-white rounded-xl shadow-xl w-1/5 h-[10%] m-4 text-xl flex justify-center items-center hover:bg-gray-300 hover:cursor-pointer'>
          <Link to='/ballot'>BALLOT</Link>
        </li>
      </ul>

    </div>
  )
}

export default App
