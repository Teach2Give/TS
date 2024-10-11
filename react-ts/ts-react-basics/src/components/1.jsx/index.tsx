function App(): JSX.Element {

    //TSX automatically infers a React 
    //componet to type JSX.Element
    //This means it will be accepting only jsx
    //if you explicitly put it, then no other 
    //types can be added
    return (
      <>
        Hello TS 
      </>
    )
  }
  
  export default App