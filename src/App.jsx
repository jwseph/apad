import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Tile() {

}

function App() {
  const [day, setDay] = useState()
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    refreshSolution();
  }, [day])

  useEffect(() => {
    const interval = setInterval(refreshDay, 60_000);
    return () => clearInterval(interval);
  }, [])

  function refreshDay() {
    setDay(new Date().getDate());
  }

  async function refreshSolution() {
    let resp = await fetch('https://io.kamiak.org/apad/');
    let obj = await resp.json();
    setSolution(obj);
    console.log(obj)
  }

  return (
    <div className='bg-zinc-50 dark:bg-black w-full min-h-[100svh] px-0 sm:px-8 py-1 sm:py-8 flex flex-col justify-center items-center bg-gradient-to-br selection:bg-zinc-300 selection:text-zinc-800 dark:selection:bg-zinc-700 dark:selection:text-zinc-50 select-none duration-300 ease-in-out'>

    </div>
  )
}

export default App
