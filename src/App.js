import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [calc, setCalc] = useState({
    equation: [],
    display: '0',
    restarted: false,
    degFlag: 'deg',
    functionInUse: false,
    result: 0
  })

  //create a 'function' array to see which values are functions
  const FUNCTION = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt']

  //create options array
  const OPTIONS = ['Deg', 'x^y', '=']

  //function to handle clicks of buttons
  const clickHandler = (e) => {
    let value = e.target.value

    if (value === 'AC'){
      acfunc()
      return
    }
    //if value is a function
    if (FUNCTION.includes(value)) {
      evaluateFunction(value)
      return
    }
    //if value is an option
    if (OPTIONS.includes(value)) {
      evaluateOption(value)
      return
    }
    if (calc.restarted) {
      setCalc(
        {
          ...calc,
          equation: [value],
          display: [...calc.equation, value].join(''),
          restarted: false
        }
      )
      return
    }
    else if (calc.functionInUse) {
      const temp = calc.equation
      temp.pop()
      const appendArray = [value, ')']
      setCalc(
        {
          ...calc,
          equation: [...temp.concat(appendArray)],
          display: [...temp.concat(appendArray)].join(''),
        }
      )
      return
    }
    else {
      if (value === 'x!') {
        value = '!'
      }
      if (value === 'EXP') {
        value = '10^'
      }
      setCalc(
        {
          ...calc,
          equation: [...calc.equation, value],
          display: [...calc.equation, value].join('')
        }
      )
    }
  }

  //evaluate function
  const evaluateFunction = (func) => {
    const subArray = [func, '(', ')']
    setCalc(
      {
        ...calc,
        equation: [...calc.equation, ...subArray],
        display: [...calc.equation, ...subArray].join(''),
        functionInUse: true,
        restarted: false
      })
  }

  //evaluate the option
  const evaluateOption = (val) => {
    switch (val) {
      case 'Deg':
        degfunc()
        break
      case '=':
        solveEQ()
        break
      case 'EXP':
        //expfunc()
        break
      default:
        errorMessage()
    }
  }


  //AC function
  const acfunc = () => {
    setCalc({
      ...calc,
      equation: [],
      display: '0',
      restarted: false,
      degFlag: 'deg',
      functionInUse: false,
      result: 0
    })
  }

  //Deg function
  const degfunc = () => {
    const currentDeg = calc.degFlag
    setCalc({
      ...calc,
      degFlag: currentDeg === 'deg'
        ? 'rad'
        : 'deg'
    })
  }

  console.log(calc)
  //error message
  const errorMessage = () => {
    setCalc({
      ...calc,
      equation: [],
      display: '0',
      restarted: false,
      degFlag: 'deg',
      functionInUse: false,
    })
  }

  const solveEQ = () => {

    const encodedDisplay = calc.display.replaceAll('x', '*')
    const url = `http://api.mathjs.org/v4/?expr=${encodedDisplay}&precision=5`

    fetchData(url)

    async function fetchData(link) {
      await fetch(link)
        .then(res => res.json())
        .then(data => {
          setCalc({
            ...calc,
            equation: [],
            display: data,
            restarted: true,
            functionInUse: false,
          })
        })
    }
  }

  return (
    <div className="App">
      <div className="main-container">
        <input className='calc-screen' value={calc.display} readOnly />
        <div className='calc-buttons'>
          <button onClick={clickHandler} value="Deg" className='button'>Deg</button>
          <button onClick={clickHandler} value="x!" className='button'>x!</button>
          <button onClick={clickHandler} value="(" className='button'>{'('}</button>
          <button onClick={clickHandler} value=")" className='button'>{')'}</button>
          <button onClick={clickHandler} value="%" className='button'>%</button>
          <button onClick={clickHandler} value="AC" className='button'>AC</button>
          <button onClick={clickHandler} value="sin" className='button'>sin</button>
          <button onClick={clickHandler} value="ln" className='button'>ln</button>
          <button onClick={clickHandler} value="7" className='button number'>7</button>
          <button onClick={clickHandler} value="8" className='button number'>8</button>
          <button onClick={clickHandler} value="9" className='button number'>9</button>
          <button onClick={clickHandler} value="/" className='button'>/</button>
          <button onClick={clickHandler} value="cos" className='button'>cos</button>
          <button onClick={clickHandler} value="log" className='button'>log</button>
          <button onClick={clickHandler} value="4" className='button number'>4</button>
          <button onClick={clickHandler} value="5" className='button number'>5</button>
          <button onClick={clickHandler} value="6" className='button number'>6</button>
          <button onClick={clickHandler} value="x" className='button'>x</button>
          <button onClick={clickHandler} value="tan" className='button'>tan</button>
          <button onClick={clickHandler} value="sqrt" className='button'>sqrt</button>
          <button onClick={clickHandler} value="1" className='button number'>1</button>
          <button onClick={clickHandler} value="2" className='button number'>2</button>
          <button onClick={clickHandler} value="3" className='button number'>3</button>
          <button onClick={clickHandler} value="-" className='button'>-</button>
          <button onClick={clickHandler} value="EXP" className='button'>EXP</button>
          <button onClick={clickHandler} value="x^y" className='button'>x^y</button>
          <button onClick={clickHandler} value="0" className='button number'>0</button>
          <button onClick={clickHandler} value="." className='button number'>.</button>
          <button onClick={clickHandler} value="=" className='button equal' >=</button>
          <button onClick={clickHandler} value="+" className='button'>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
