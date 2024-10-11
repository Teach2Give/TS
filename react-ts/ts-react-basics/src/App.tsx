import Props from "./components/2.props";
import "./App.css";
import PropsTypeAlias from "./components/2.props/reusableProps";
import ChildrenProps from "./components/2.props/3.childrenProps";
import StateBasics from "./components/3.state/1.stateBasics";
import CustomLinks from "./components/3.state/2.customList";
import ChangeEvents from "./components/4.Events/ChangeEvents";

function App() {
  return (
    <>
      <Props name="Alamin" id={2324} />
      <br />
      <PropsTypeAlias name="Prop Type" id={2324} />
      <br />
      <ChildrenProps name="Alamin Child" id={2324}>
        <h1>Imagine i am the child passed as props😂</h1>
        {/* children can be other componets passed in short */}
      </ChildrenProps>
      <br />
      <StateBasics />
      <br />
      <CustomLinks />
      <br />
      <ChangeEvents />
    </>
  );
}

export default App;
