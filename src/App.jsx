import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const COLORS = {
  100: '#000000',
  101: '#000000',
  201: '#ff0000',
  202: '#00ff00',
  203: '#0000ff',
  204: '#00ffff',
  205: '#ff00ff',
  206: '#ffff00',
  207: '#ffffff',
  208: '#ff0000',
  209: '#ff0000',
  210: '#ff00ff',
};

function Tile({num}) {
  return (
    <div className='' style={{color: COLORS[num]}}>
      {num > 200 ? num-201 : 0}
    </div>
  )
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
    console.log(obj+'')
  }

  return (
    <div className='font-mono bg-zinc-50 dark:bg-black w-full min-h-[100svh] px-0 sm:px-8 py-1 sm:py-8 flex flex-col justify-center items-center bg-gradient-to-br selection:bg-zinc-300 selection:text-zinc-800 dark:selection:bg-zinc-700 dark:selection:text-zinc-50 select-none duration-300 ease-in-out'>
      {solution && (
        <div>
          {solution.map((row, r) => (
            <div key={'row'+r} className='flex gap-4'>
              {row.map((num, c) => (
                <Tile key={'col'+c} num={num}/>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
