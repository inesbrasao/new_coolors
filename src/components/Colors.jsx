import { useEffect, useState } from 'react';
import styles from './Colors.module.css'

const unlocked = <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z" stroke="#1C274C" strokeWidth="1.5"/>
<path opacity="0.5" d="M6 10V8C6 4.68629 8.68629 2 12 2C14.7958 2 17.1449 3.91216 17.811 6.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
</svg>

const locked = <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z" stroke="#1C274C" strokeWidth="1.5"/>
<path opacity="0.5" d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
</svg>

const LOCAL_STORAGE_KEY = "palette"

export function Colors() {
    const randColor = () =>  {
        return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    }
    
    const [state, setState] = useState([
        { 
        index: 0,
        color: randColor(),
        isBlocked: false,
    },
        { 
        index: 1,
        color: randColor(),
        isBlocked: false,
    },
        { 
        index: 2,
        color: randColor(),
        isBlocked: false,
    },
        {
        index: 3, 
        color: randColor(),
        isBlocked: false,
    },
        {
        index: 4, 
        color: randColor(),
        isBlocked: false,
    },
    ])

    const newColor = () => ({ 
        index: undefined,
        color: randColor(),
        isBlocked: false,
    })
        

useEffect(() => {
    window.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        const blockedColors= state.filter(el => el.isBlocked)
        let newState = []

        for(let i = 0; i < state.length; i++){
            if(blockedColors[i]){
                console.log(blockedColors)
                newState.push(blockedColors[i])
            } else {
                let addColor = newColor()
                addColor.index = i
                newState.push(addColor)
            }
        }

        newState.sort((a, b) => a.index - b.index)

      setState(newState)
    }
  })
}, [])

function handleClick(color){
    const nextState = [...state];
    const colorId = nextState.find(
      el => el.color === color
    );
    colorId.isBlocked = !colorId.isBlocked;
    setState(nextState);
}
    
    
    return (

      <div className={styles.wrapper}>
        {state.map((el, i) => <div key={i} className={styles.cor} style={{ backgroundColor: `${el.color}`}}>
            <span className={styles.nomeCor} onClick={() => {

                navigator.clipboard.writeText(el.color)}}>{el.color}</span>
            {el.isBlocked ? <span className={styles.lock} onClick={() => handleClick(el.color)}>{locked}</span> : <span className={styles.lock} onClick={() => handleClick(el.color)}>{unlocked}</span>}
            </div>)}
      </div>
    );
  }
  