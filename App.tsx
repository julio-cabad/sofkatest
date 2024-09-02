/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, View} from 'react-native';
import tw from "twrnc";
import { StoresProvider } from "./src/stores/Provider.tsx";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/components/routes/Routes.tsx";


function App(): React.JSX.Element {

  return (
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <StoresProvider>
          <View style={{flex: 1}}>
            <NavigationContainer >
              <Routes />
            </NavigationContainer>
          </View>
        </StoresProvider>
      </SafeAreaView>
  );
}

export default App;
