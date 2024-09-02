import { Dispatch, SetStateAction } from "react";

// TYPES
export type StateType<T> = [T, Dispatch<SetStateAction<T>>];

// INTERFACES
export interface AlertState {
    head: string;
    body: string;
    textButton: string;
    icon: JSX.Element | null;
    isVisible: boolean;
    error: boolean;
}

export interface FinancialProduct {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export interface InitialValues {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}


