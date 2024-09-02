import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import ListFinancialProducts from "../screens/financial-products/list-financial-product/ListFinancialProducts.tsx";
import AddFinancialProduct from "../screens/financial-products/add-financial-product/AddFinancialProduct.tsx";
import DetailFinancialProducts from "../screens/financial-products/detail-financial-product/DetailFinancialProducts.tsx";
import EditFinancialProducts from "../screens/financial-products/edit-financial-product/EditFinancialProducts.tsx";


interface ComponentProps {
}


const Stack = createStackNavigator();

const Routes: React.FC<ComponentProps> = () => {


  return (
    <Stack.Navigator
      initialRouteName={"ListFinancialProducts"}
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
        headerMode: "float"
      }}>
      <Stack.Screen name="ListFinancialProducts" component={ListFinancialProducts} />
      <Stack.Screen name="AddFinancialProduct" component={AddFinancialProduct} />
      <Stack.Screen name="DetailFinancialProducts" component={DetailFinancialProducts} />
      <Stack.Screen name="EditFinancialProducts" component={EditFinancialProducts} />
    </Stack.Navigator>
  );
};

export default Routes;
