import React from 'react';

function UseEffectComponent() {
  const [val, valSet] = React.useState(1);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      valSet((val) => val + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <div>{val}</div>;
}

export default UseEffectComponent;

/*


function useEffect(effect: EffectCallback, deps?: DependencyList): void;


 EffectCallback takes in a function a returns either void or a Destructor 

type EffectCallback = () => (void | Destructor);

Destructor takes in a function and returns void or  undefined
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };


*/
