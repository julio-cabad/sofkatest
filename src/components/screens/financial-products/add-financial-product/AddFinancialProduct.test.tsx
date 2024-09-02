import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { StoreContext } from '../../../../stores/Context.tsx';
import AddFinancialProduct from './AddFinancialProduct.tsx';
import axios from 'axios';


jest.mock('@gorhom/bottom-sheet', () => ({
    BottomSheetModal: jest.fn(() => ({
        present: jest.fn(),
        dismiss: jest.fn(),
    })),
    BottomSheetModalProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(() => ({
        navigate: jest.fn(),
    })),
}));

jest.mock('../../../palette/CalendarSheetPicker.tsx', () => ({
    __esModule: true,
    default: ({ bottomSheetModalRef, setFieldValue }: { bottomSheetModalRef: any; setFieldValue: any }) => (
        <></>
    ),
}));

jest.mock('../../../palette/MobileAlertsMessages.tsx', () => ({
    __esModule: true,
    default: ({ isVisible, body, head, textButton, icon, handleOnPress }: any) => (
        <></>
    ),
}));

jest.mock('../../../palette/Loading.tsx', () => ({
    __esModule: true,
    default: ({ isLoading, labelText }: any) => <></>,
}));

describe('AddFinancialProduct', () => {
    const mockDataStore = {
        BASE_URL: 'http://mock-url',
        FinancialProductsList: jest.fn(),
    };

    const mockStoreContext = {
        dataStore: mockDataStore,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form and handle submit', async () => {
        const { getByText, getByPlaceholderText } = render(
            // @ts-ignore
            <StoreContext.Provider value={mockStoreContext}>
                <AddFinancialProduct />
            </StoreContext.Provider>
        );

        // Check if form elements are present
        expect(getByPlaceholderText('ID')).toBeTruthy();
        expect(getByPlaceholderText('Nombre')).toBeTruthy();
        expect(getByPlaceholderText('Descripción')).toBeTruthy();
        expect(getByPlaceholderText('Logo')).toBeTruthy();

        // Simulate form input
        fireEvent.changeText(getByPlaceholderText('ID'), '123');
        fireEvent.changeText(getByPlaceholderText('Nombre'), 'Test Product');
        fireEvent.changeText(getByPlaceholderText('Descripción'), 'Test Description');
        fireEvent.changeText(getByPlaceholderText('Logo'), 'Test Logo');

        // Mock the API responses
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: false }); // for validation
        (axios.post as jest.Mock).mockResolvedValueOnce({});

        // Submit the form
        fireEvent.press(getByText('Enviar'));

        await waitFor(() => {
            expect(mockDataStore.FinancialProductsList).toHaveBeenCalled();
        });
    });

    it('should handle API error during submission', async () => {
        const { getByText, getByPlaceholderText } = render(
            // @ts-ignore
            <StoreContext.Provider value={mockStoreContext}>
                <AddFinancialProduct />
            </StoreContext.Provider>
        );

        // Simulate form input
        fireEvent.changeText(getByPlaceholderText('ID'), '123');

        // Mock the API responses to simulate an error
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Error'));
        (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Error'));

        // Submit the form
        fireEvent.press(getByText('Enviar'));

        await waitFor(() => {
            expect(getByText('Ha ocurrido un error, intentelo nuevamente')).toBeTruthy();
        });
    });

    it('should display success message on successful submission', async () => {

        const { getByText, getByPlaceholderText } = render(
            // @ts-ignore
            <StoreContext.Provider value={mockStoreContext}>
                <AddFinancialProduct />
            </StoreContext.Provider>
        );

        // Simulate form input
        fireEvent.changeText(getByPlaceholderText('ID'), '123');
        fireEvent.changeText(getByPlaceholderText('Nombre'), 'Test Product');

        // Mock the API responses
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: false }); // for validation
        (axios.post as jest.Mock).mockResolvedValueOnce({});

        // Submit the form
        fireEvent.press(getByText('Enviar'));

        await waitFor(() => {
            expect(getByText('PRODUCTO AGREGADO')).toBeTruthy();
        });
    });
});
