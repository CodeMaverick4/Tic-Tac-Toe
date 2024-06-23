import logo from './logo.svg';
import './App.css';
import { useEffect, useState,createContext, useContext } from 'react';
import Grid from './Grid';

// Create context
const GlobalStateContext = createContext();

// Create provider component
const GlobalStateProvider = ({ children }) => {
  const [isCross, setCross] = useState(true); // Example state
  const [gameStatus, setGameStatus] = useState('ongoing');

  return (
    <GlobalStateContext.Provider value={{ isCross, setCross, gameStatus,setGameStatus}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

function App() {
  const {isCross} = useContext(GlobalStateContext);
  const [num,setNum] = useState(3);

  return (
    <div className='h-screen flex flex-col justify-center items-center font-mono'>
      <h1 className='text-3xl p-3'>Tic-tac-toe</h1>
      <p className='text-2xl'>{isCross ? 'X':'O'} turn</p>
      <Grid num={num} />
    </div>
    
  );
}

export default App;
export { GlobalStateProvider, GlobalStateContext };