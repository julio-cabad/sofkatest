import { makeAutoObservable, runInAction } from "mobx";
// @ts-ignore
import { BASE_URL, BASE_URL_ } from "@env";
import axios from "axios";

class DataStore {

    financialProductsList: object | null = null;
    detailFinancialProducts: object | null = null;
    BASE_URL: string | null = BASE_URL_;

    constructor() {
        makeAutoObservable(this);
    }

    /*FINANCIAL PRODUCTS LIST*/
    FinancialProductsList = async () => {
        const url = `${BASE_URL_}/bp/products`;
        const res = await axios.get(url);
        runInAction(() => this.financialProductsList = res.data);
    };

    DetailFinancialProducts = (detail: any) => this.detailFinancialProducts = detail;

}

export { DataStore };
