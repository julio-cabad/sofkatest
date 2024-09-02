import React, { ReactNode } from "react";
import {useLocalObservable} from 'mobx-react-lite';
import {StoreContext} from './Context';
import {configure} from 'mobx';
import { DataStore } from "./DataStore";

const StoresProvider = ({ children }: { children: ReactNode }) => {

  const dataStore = useLocalObservable(() => new DataStore());

  return (
    <StoreContext.Provider value={{dataStore}}>
      {children}
    </StoreContext.Provider>
  );
};

configure({enforceActions: 'always'});

export {StoresProvider};
