import React from 'react';

export const defaultAppState = {
  nurseList: []
}

export const AppContext = React.createContext(defaultAppState)
