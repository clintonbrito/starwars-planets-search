import React, { useState } from 'react';
import MyContext from './myContext';

const INITIAL_STATE = {
  name: 'Bill',
  age: 20,
};

function Provider ({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  // const contextValue = {
  //   state,
  //   setState,
  // };
  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
