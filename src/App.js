import React, { useState } from 'react';
import { AppContext, defaultAppState } from './components/AppContext/index';

import ListMain from './components/ListMain';
import Intro from './components/Intro/index';

const App = () => {
  const [appState, setState] = useState(defaultAppState);

  return (
    <>
      <Intro />
      <div className='app-bg'></div>
      <AppContext.Provider value={{ appState, setState }}>
        <ListMain />
      </AppContext.Provider>
    </>
  );
};

export default App;
