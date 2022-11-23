/* 
useRef allows you to reference a value that is not needed for rendering.

Call useRef at top level of your component to declare 1+ refs
useref returns a ref object w/ 1 current property, initially set to inital value provided.

*/

import React from 'react';

function UseRefComponent() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return <input ref={inputRef} />;
}

export default UseRefComponent;
