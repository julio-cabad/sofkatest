import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { StoreContext } from '../../../../stores/Context.tsx';
import { useFinancialProducts } from '../../../hooks/useFinancialProducts.tsx';
import ListFinancialProducts from './ListFinancialProducts.tsx';

jest.mock('../../../hooks/useFinancialProducts.tsx', () => ({
    useFinancialProducts: jest.fn(),
}));


const mockStoreContext = {
    dataStore: {
        financialProductsList: [
            { id: '1', name: 'Product 1' },
            { id: '2', name: 'Product 2' },
        ],
        DetailFinancialProducts: jest.fn(),
    },
};

// Mock de las dependencias
jest.mock('react-native-screens/native-stack', () => ({
    NativeStackNavigationProp: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));
jest.mock('@gorhom/bottom-sheet', () => ({
    BottomSheetModalProvider: ({ children }: { children: React.ReactNode }) => children,
    BottomSheetModal: jest.fn(),
}));

describe('ListFinancialProducts', () => {
    beforeEach(() => {
        (useFinancialProducts as jest.Mock).mockReturnValue({
            data: mockStoreContext.dataStore.financialProductsList,
            alerts: { isVisible: false, body: '', head: '', textButton: '', icon: null },
            setAlerts: jest.fn(),
            fetchFinancialProducts: jest.fn(),
        });
    });

    it('should render the list of financial products', () => {
        const { getByText } = render(
            // @ts-ignore
            <StoreContext.Provider value={mockStoreContext}>
                <ListFinancialProducts />
            </StoreContext.Provider>
        );

        expect(getByText('Product 1')).toBeTruthy();
        expect(getByText('Product 2')).toBeTruthy();
    });

    it('should filter the list based on search input', async () => {
        const { getByPlaceholderText, getByText, queryByText } = render(
            // @ts-ignore
            <StoreContext.Provider value={mockStoreContext}>
                <ListFinancialProducts />
            </StoreContext.Provider>
        );

        const searchInput = getByPlaceholderText('Buscar');
        fireEvent.changeText(searchInput, 'Product 1');

        await waitFor(() => {
            expect(getByText('Product 1')).toBeTruthy();
            expect(queryByText('Product 2')).toBeNull();
        });
    });

    it('should display no data message if no products are available', () => {
        (useFinancialProducts as jest.Mock).mockReturnValue({
            data: [],
            alerts: { isVisible: false, body: '', head: '', textButton: '', icon: null },
            setAlerts: jest.fn(),
            fetchFinancialProducts: jest.fn(),
        });


        const { getByText } = render(
            // @ts-ignore
            <StoreContext.Provider value={mockStoreContext}>
                <ListFinancialProducts />
            </StoreContext.Provider>
        );

        expect(getByText('Sin registros')).toBeTruthy();
    });

    it('should handle add financial product navigation', () => {
        const { getByText } = render(
            // @ts-ignore
            <StoreContext.Provider value={mockStoreContext}>
                <ListFinancialProducts />
            </StoreContext.Provider>
        );

        const addButton = getByText('Agregar');
        fireEvent.press(addButton);

        // Verifica la navegación
        expect(mockStoreContext.dataStore.DetailFinancialProducts).toHaveBeenCalled();
    });
});
