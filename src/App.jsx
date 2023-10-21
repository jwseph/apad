import { useEffect, useState } from 'react'
import './App.css'

const COLORS = {
  100: '#475569',
  101: '#475569',
  201: '#ff0000',
  202: '#ff562b',
  203: '#ffa256',
  204: '#d4dc7f',
  205: '#9cfaa3',
  206: '#62fac3',
  207: '#2adcdc',
  208: '#0fa2ef',
  209: '#4756fb',
  210: '#7f00ff',
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
  const [date, setDate] = useState('');

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
    setSolution(obj.solution);
    setDate(obj.date.toLowerCase().replaceAll(' ', ''));
  }

  return (
    <div className='cursor-pointer relative text-3xl font-mono bg-white dark:bg-black text-white dark:text-black w-full min-h-[100svh] px-4 py-8 flex flex-col justify-center items-center bg-gradient-to-br select-none'>
      <div className='flex flex-col items-end'>
        {solution && (<>
          {solution.map((row, r) => (
            <div key={'row'+r} className='flex gap-5'>
              <div key={'row start'+r} className='leading-9 text-slate-500'>
                {r < date.length && date[r]}
              </div>
              {row.map((num, c) => (
                <Tile key={'col'+c} num={num} cur={cur}/>
              ))}
            </div>
          ))}
        </>)}
      </div>
      <button
        className='fixed top-0 left-0 right-0 bottom-0 bg-transparent duration-500 ease-in-out'
        onClick={() => setCur((cur-201+1)%11+201)}
      ></button>
    </div>
  )
}

export default App
