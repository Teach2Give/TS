import { useState } from "react"

function StateBasics(): JSX.Element {
    const [text, setText] = useState('shakeAndBake') //automatic inference to string
    const [num, setNum] = useState<Number>(2) //explicit add type
    const [list, setList] = useState<string[]>([])
    return (
      <>
        <button className="" style={{background: 'green'}} onClick={() => {
            setText('Typescript is awesome 😂😂😂')
            //setText(23) //Argument of type 'number' is not assignable to parameter of type 'SetStateAction<string>'.
            setList(['I am a list👍', 'list 2😊'])
        }}>Click Me</button>
        <h2>{text}</h2>
        <h2>{list}</h2>
      </>
    )
  }
  
  export default StateBasics