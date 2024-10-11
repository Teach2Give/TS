//we can either use propsWithChildren or using React.React.Node as type of props
import { type PropsWithChildren } from "react";
/**
 * (alias) type PropsWithChildren<P = unknown> = P & {
    children?: React.ReactNode | undefined;
}
 */

//one  - 1
type ComponentProps = {
  name: string;
  id: number;
  children: React.ReactNode;
};

//two - 2
type ComponentProps2 = PropsWithChildren<{
  name: string;
  id: number;
  children: React.ReactNode;
}>;


//use any type you need
function ChildrenProps({ name, id, children }: ComponentProps): JSX.Element {
  return (
    <>
      Hello TS: my name is {name} and my id is: {id}
      {children}
    </>
  );
}

export default ChildrenProps;
