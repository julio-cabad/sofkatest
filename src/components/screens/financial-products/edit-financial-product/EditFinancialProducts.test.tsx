import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StoreContext } from '../../../../stores/Context.tsx';
import EditFinancialProducts from './EditFinancialProducts.tsx';
import axios from 'axios';


// Mock de StoreContext
const mockDataStore = {
    detailFinancialProducts: {
        id: '1',
        date_release: '2024-01-01',
        date_revision: '2024-02-01',
        description: 'Descripción del producto',
        logo: 'https://logo.url',
        name: 'Producto'
    },
    BASE_URL: 'http://localhost:3002',
    FinancialProductsList: jest.fn()
};

// Mock de axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EditFinancialProducts', () => {
    beforeEach(() => {
        mockedAxios.put.mockResolvedValue({ data: {} });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render correctly and submit the form', async () => {


        const { getByText, getByLabelText } = render(
            <BottomSheetModalProvider>

                <StoreContext.Provider  // @ts-ignore
                    value={mockDataStore}>
                    <EditFinancialProducts />
                </StoreContext.Provider>
            </BottomSheetModalProvider>
        );

        // Verificar que los campos se renderizan correctamente
        expect(getByLabelText(/ID/i)).toBeTruthy();
        expect(getByLabelText(/Nombre/i)).toBeTruthy();
        expect(getByLabelText(/Descripción/i)).toBeTruthy();
        expect(getByLabelText(/Logo/i)).toBeTruthy();
        expect(getByLabelText(/Fecha de liberación/i)).toBeTruthy();
        expect(getByLabelText(/Fecha de revisión/i)).toBeTruthy();

        // Simular el cambio de valores en el formulario
        fireEvent.changeText(getByLabelText(/Nombre/i), 'Nuevo Producto');
        fireEvent.changeText(getByLabelText(/Descripción/i), 'Nueva Descripción');

        // Simular el envío del formulario
        fireEvent.press(getByText(/Enviar/i));

        // Esperar y verificar que la solicitud ha sido realizada
        await waitFor(() => {
            expect(mockedAxios.put).toHaveBeenCalledWith('https://api.example.com/bp/products/1', {
                id: '1',
                date_release: '2024-01-01',
                date_revision: '2024-02-01',
                description: 'Nueva Descripción',
                logo: 'https://logo.url',
                name: 'Nuevo Producto'
            });
        });

        // Puedes agregar más pruebas para verificar el comportamiento de los mensajes de alerta y la carga
    });

    // Agrega más pruebas para cubrir otros escenarios (errores, carga, reinicio del formulario, etc.)
});
