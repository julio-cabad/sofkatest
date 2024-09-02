import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DetailFinancialProducts from './DetailFinancialProducts.tsx';
import { StoreContext } from '../../../../stores/Context.tsx';
import axios from 'axios';

jest.mock('axios');


const mockDataStore = {
    detailFinancialProducts: {
        id: '123',
        name: 'Test Product',
        description: 'Test Description',
        logo: 'https://example.com/logo.png',
        date_release: '2024-01-01',
        date_revision: '2024-02-01',
    },
    BASE_URL: 'https://api.example.com',
    FinancialProductsList: jest.fn(),
};


const renderComponent = () =>
    render(
        // @ts-ignore
        <StoreContext.Provider value={mockDataStore}>
            <DetailFinancialProducts />
        </StoreContext.Provider>
    );

describe('DetailFinancialProducts', () => {
    it('renders correctly', () => {
        const { getByText, getByTestId } = renderComponent();
        expect(getByText('ID: 123')).toBeTruthy();
        expect(getByText('Nombre')).toBeTruthy();
        expect(getByText('Test Product')).toBeTruthy();
        expect(getByText('Descripción')).toBeTruthy();
        expect(getByText('Test Description')).toBeTruthy();
        expect(getByText('Logo')).toBeTruthy();
        expect(getByText('Fecha de liberación')).toBeTruthy();
        expect(getByText('2024-01-01')).toBeTruthy();
        expect(getByText('Fecha de revisión')).toBeTruthy();
        expect(getByText('2024-02-01')).toBeTruthy();
    });

    it('handles delete button press', async () => {
        const { getByText } = renderComponent();
        const deleteButton = getByText('Eliminar');

        fireEvent.press(deleteButton);

        // Mock de la respuesta de la solicitud delete
        (axios.delete as jest.Mock).mockResolvedValue({ status: 200 });

        // Simula la confirmación en el modal
        const confirmButton = getByText('CONFIRMAR');
        fireEvent.press(confirmButton);

        // Verifica si se mostró el mensaje de éxito
        await waitFor(() => {
            expect(getByText('PRODUCTO ELIMINADO')).toBeTruthy();
            expect(getByText('El producto Test Product se eliminó exitosamente')).toBeTruthy();
        });
    });

    it('handles delete error', async () => {
        const { getByText } = renderComponent();
        const deleteButton = getByText('Eliminar');

        // Simula la apertura del modal
        fireEvent.press(deleteButton);

        // Mock de la respuesta de la solicitud delete con error
        (axios.delete as jest.Mock).mockRejectedValue(new Error('Delete failed'));

        // Simula la confirmación en el modal
        const confirmButton = getByText('CONFIRMAR');
        fireEvent.press(confirmButton);

        // Verifica si se mostró el mensaje de error
        await waitFor(() => {
            expect(getByText('AVISO')).toBeTruthy();
            expect(getByText('Ha ocurrido un error, inténtelo nuevamente')).toBeTruthy();
        });
    });
});
