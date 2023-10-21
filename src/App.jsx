import { useEffect, useState } from 'react'
import './App.css'

const COLORS = {
  100: '#ffffff',
  101: '#ffffff',
  201: '#ff0000',
  202: '#ff9900',
  203: '#ccff00',
  204: '#33ff00',
  205: '#00ff66',
  206: '#00ffff',
  207: '#0066ff',
  208: '#3300ff',
  209: '#cc00ff',
  210: '#ff0099',
};

function Tile({num, cur}) {
  return (
    <div className='leading-9 duration-1000 ease-in-out' style={{color: num < cur && COLORS[num]}}>
      {num < 200 ? '.' : num-201}
    </div>
  )
}

function App() {
  const [day, setDay] = useState()
  const [solution, setSolution] = useState(null);
  const [cur, setCur] = useState(201);

  useEffect(() => {
    setTimeout(refreshSolution, 1000)
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
  }

  return (
    <div className='cursor-pointer relative text-3xl font-mono bg-zinc-50 dark:bg-black text-zinc-50 dark:text-black w-full min-h-[100svh] px-4 py-8 flex flex-col justify-center items-center bg-gradient-to-br select-none'>
      {solution && (
        <div className=''>
          {solution.map((row, r) => (
            <div key={'row'+r} className='flex gap-5'>
              {row.map((num, c) => (
                <Tile key={'col'+c} num={num} cur={cur}/>
              ))}
            </div>
          ))}
        </div>
      )}
      <button
        className='fixed top-0 left-0 right-0 bottom-0 bg-transparent duration-500 ease-in-out'
        onClick={() => setCur((cur-201+1)%11+201)}
      ></button>
    </div>
  )
}

export default App
