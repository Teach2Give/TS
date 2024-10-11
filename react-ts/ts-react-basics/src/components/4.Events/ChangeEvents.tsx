import React, { useState } from "react";

type Props = {};
type Person = {
  name: string
}
const ChangeEvents = (props: Props) => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  //const handleChang = (e) => {  } Parameter 'e' implicitly has an 'any' type.ts(7006)
  //we need to add types to it
  const handleChang = (e: React.ChangeEvent<HTMLInputElement>) => {  
    console.log(e.target.value)
    //setEmail(e.target.value)
  }

  // handle submit 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // const form = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    console.log(data)

    const text = formData.get("text") as typeof person.name //telling TS we know more

    const person:Person = {name:text}
   }

  return (
    <div>
      <h2>Form change example</h2>
      <input
        type="text"
        className="form-input mb-1"
        value={text}
        //(parameter) e: React.ChangeEvent<HTMLInputElement>
        //inline event is automatically infered
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="email"
        className="form-input mb-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="" >Submit</button>
    </div>
  );
};

export default ChangeEvents