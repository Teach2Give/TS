import { useState } from "react";
type NavLinks = {
    id: number;
    url: string;
    tetx: string;
}

const navLinks = [
  {
    id: 1,
    url: "some url",
    tetx: "some text👌 ",
  },
  {
    id: 2,
    url: "some url 2",
    tetx: "some text👌👌",
  },
  {
    id: 3,
    url: "some url 3",
    tetx: "some text👌👌👌 ",
  },
];

function CustomLinks(): JSX.Element {
  const [text, setText] = useState("shakeAndBake"); //automatic inference to string
  const [num, setNum] = useState<Number>(2); //explicit add type
  const [list, setList] = useState<string[]>([]);
  //const [links, setLinks] = useState(navLinks) // this one is inferred based on the original 
  //lets add the type to the links 
  const [links, setLinks] = useState<NavLinks[]>(navLinks) //const links: NavLinks[]

  return (
    <>
      <button
        className=""
        style={{ background: "green" }}
        onClick={() => {
          setText("Typescript is awesome 😂😂😂");
          //setText(23) //Argument of type 'number' is not assignable to parameter of type 'SetStateAction<string>'.
          setList(["I am a list👍", "list 2😊"]);
          setLinks([...links, {id:4, url:"Hello", tetx:"Hello"}])
        }}
      >
        Click Me
      </button>
      <h2>{text}</h2>
      <h2>{list}</h2>
    </>
  );
}

export default CustomLinks;
