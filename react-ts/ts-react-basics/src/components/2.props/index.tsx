
//inline props 
function Props({name, id}: {name:string, id:number}): JSX.Element {
    return (
      <>
        Hello TS: my name is {name} and my id is: {id}
      </>
    )
  }
  
  export default Props