
//we can either use types or interfaces
type ComponentProps =  {name:string, id:number}
function PropsTypeAlias({name, id}:ComponentProps ): JSX.Element {
    return (
      <>
        Hello TS: my name is {name} and my id is: {id}
      </>
    )
  }
  
  export default PropsTypeAlias