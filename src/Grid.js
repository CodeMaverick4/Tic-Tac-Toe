import React, { useContext, useState } from 'react'
import SingleBox from './singleBox'
import { GlobalStateContext } from './App';

export default function Grid({num}) {
    const [matrix,setMatrix] = useState(Array.from({length:num},()=> Array(num).fill('')))
    const [clickCount,setCount] = useState(1);
    const {gameStatus,setGameStatus} = useContext(GlobalStateContext);
    const [resetAllBoxes,setResetAllBoxes] = useState(false);
    const [gameOver,setGameOver] = useState(false);

    
    const resetGame = () => {
        setMatrix(Array.from({ length: num }, () => Array(num).fill('')));
        setCount(1);
        setGameStatus('ongoing');
        setResetAllBoxes(true); // Trigger reset of all SingleBox isClicked
        setGameOver(false); 
    };
    
    return (
        <>
        {/* <button className='p-5 border border-black rounded-full bg-gradient-to-r from-green-500 via-pink-500 hover:bg-gradient-to-r hover:to-green-500 hover:from-yellow-500 '>abdullah ka button</button> */}
        <div className='flex items-center gap-16 mb-3'>
            
            <p className={` ${gameOver ? "text-green-400 animate-bounce":''} ${gameStatus ==="Draw" ? "text-red-400 animate-bounce":''} `}>Game Status: {gameStatus}</p>
            <button onClick={()=>resetGame()} className='p-2 border border-black rounded-lg hover:text-white hover:bg-black'>Reset</button>
        </div>
        <div className={`grid grid-cols-3 gap-3 bg-gradient-to-r  from-purple-500 to-cyan-500 via-blue-500 `}>        
            {matrix.map((row,rowInd) =>(
            row.map((cell,cellInd)=>(
                <SingleBox rowInd={rowInd} 
                clickCount={clickCount}
                 setCount={setCount}
                  cellInd={cellInd}
                   cellValue={cell}
                    prevMatrix={matrix} 
                    setMatrix={setMatrix}
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    resetAllBoxes={resetAllBoxes} // Pass resetAllBoxes state
                    setResetAllBoxes={setResetAllBoxes}/>
            ))
            
            ))}
        </div>
        </>
  )
}
