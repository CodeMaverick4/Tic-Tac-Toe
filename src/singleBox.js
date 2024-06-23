import React, { useContext ,useEffect} from 'react'
import { useState } from 'react';
import { GlobalStateContext } from './App';

export default function SingleBox({rowInd,cellInd,cellValue,prevMatrix,setMatrix,clickCount,setCount,resetAllBoxes, setResetAllBoxes ,gameOver,setGameOver }) {
    const {isCross ,setCross} = useContext(GlobalStateContext);
    const [isClicked , setClick] = useState(false);
    const {setGameStatus} = useContext(GlobalStateContext);
    
    useEffect(() => {
        // Reset isClicked state when resetAllBoxes changes
        if (resetAllBoxes) {
            setClick(false);
            setCross(true);
            setResetAllBoxes(false); // Reset trigger
            
        }
    }, [resetAllBoxes, setResetAllBoxes]);

    function leftDiagonalCheck(newMatrix){
        // digonal check 
        let temp = newMatrix[0][0];
        if (temp === 'X' || temp === "O"){
            
            for(let i =0;i<newMatrix.length;i++){
                if (temp != newMatrix[i][i]){
                    return false;
                }
            }
            return true;
        }
        return false
    }


    function rightDiagonalCheck(newMatrix){
       const  temp = newMatrix[0][newMatrix.length-1];
       if (temp === 'X' || temp === "O"){
            let j = newMatrix.length-1;
            for(let i =0;i<newMatrix.length;i++){
                if (temp != newMatrix[i][j]){
                    return false;
                    }
                j--;
                }
        return true;
        }
        return false    
    }
        
    
    function checkArryEle(arr){
        return (arr.every(ele=>ele === "X") || arr.every(ele=>ele === "O"))
    }

    function checkWin2(newMatrix){
        const hori = newMatrix.map(row=>{
            return checkArryEle(row);
        })
        
        const verti = () => {
            for(let i=0 ;i<newMatrix.length;i++){
                let temp =[] ;
                for(let j=0 ;j<newMatrix.length;j++){
                    temp.push(newMatrix[j][i]);
                    
                    }
                    if(!checkArryEle(temp)){
                        continue;
                    }
                    else{
                        return true
                    }
                }
            return false;
        }

        return (verti() || hori.some(ele=>ele===true) || rightDiagonalCheck(newMatrix) || leftDiagonalCheck(newMatrix));

    }

    function handleBoxClick(e,rowInd,cellInd){
        if(!isClicked && !gameOver){
            const newMatrix = prevMatrix.map((row,prevRowInd)=>(
                row.map((cell,prevCellInd) =>
                    (prevCellInd === cellInd && prevRowInd === rowInd) ? (isCross ? 'X':"O") : cell
                    
                ))
            )
            
            if (checkWin2(newMatrix)){
                //  console.log('win'); 
                 setGameStatus("Congrates "+(isCross ? "X":"O")+" win");
                 setGameOver(true)
                 
                 
            }
            else{
                // console.log(clickCount,newMatrix.length**2);
               ( (clickCount === (newMatrix.length**2)) ? setGameStatus("Draw") : setGameStatus("ongoing"))
            }

            setMatrix(newMatrix);
            setClick(true);
            setCross(!isCross);
            e.target.classList.remove('cursor-pointer');
            setCount(clickCount+1);
            
            
        }
    }
 
  return (
    <div
        key={`${rowInd}_${cellInd}`}
        id={`${rowInd}_${cellInd}`}
        className={`${!isClicked && !gameOver? 'cursor-pointer':''} size-20 bg-white flex justify-center items-center`}
        onClick={(e) => handleBoxClick(e,rowInd,cellInd)}>

        <div className='p-3 text-3xl' >{cellValue}</div>

    </div>
  )
}
