import React from 'react';
import {createContext} from 'react';
import { DataStore } from "./DataStore.tsx";
interface IContextValue {
  dataStore: DataStore | null;
}


const StoreContext = createContext<IContextValue>({
  dataStore: null,
});

export { StoreContext };
