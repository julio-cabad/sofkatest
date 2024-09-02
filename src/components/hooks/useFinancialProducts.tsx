import {useCallback, useContext, useEffect, useState} from "react";
import {errorIcon} from "../utils/Icons";
import axios from "axios";
import {StoreContext} from "../../stores/Context.tsx";
import {AlertState, FinancialProduct} from "../utils/Const.tsx";

export const useFinancialProducts = () => {
    const {dataStore} = useContext(StoreContext);
    const [data, setData] = useState<FinancialProduct[]>([]);
    const [alerts, setAlerts] = useState<AlertState>({
        head: "",
        body: "",
        textButton: "",
        icon: null,
        isVisible: false,
        error: false,
    });

    const fetchFinancialProducts = useCallback(async () => {
        try {
            await dataStore?.FinancialProductsList();
            // @ts-ignore
            setData(dataStore?.financialProductsList);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.message === 'Network Error') {
                    setAlerts({
                        head: 'AVISO',
                        body: 'Error de red: no se pudo conectar con el servidor',
                        textButton: 'Reintentar',
                        icon: errorIcon,
                        isVisible: true,
                        error: true,
                    });
                }
            } else {
                setAlerts({
                    head: 'AVISO',
                    body: 'Error desconocido',
                    textButton: 'Reintentar',
                    icon: errorIcon,
                    isVisible: true,
                    error: true,
                });
            }
            setData([]);
        }
    }, [dataStore]);

    useEffect(() => {
        fetchFinancialProducts().catch(() => null);
    }, [fetchFinancialProducts]);

    return {data, alerts, setAlerts, fetchFinancialProducts};
};
