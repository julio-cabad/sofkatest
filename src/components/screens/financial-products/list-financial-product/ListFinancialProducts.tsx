import React, {useCallback, useContext, useEffect, useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import tw from "twrnc";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import Loading from "../../../palette/Loading.tsx";
import {StoreContext} from "../../../../stores/Context.tsx";
import {observer} from "mobx-react-lite";
import Header from "../../../palette/Header.tsx";
import NoData from "../../../palette/NoData.tsx";
import SubmitButton from "../../../palette/SubmitButton.tsx";
import {blueColor, yellowColor} from "../../../utils/Colors.tsx";
import {arrowIcon} from "../../../utils/Icons";
import {FinancialProduct, StateType} from "../../../utils/Const.tsx";
import MobileAlertsMessages from "../../../palette/MobileAlertsMessages.tsx";
import {useFinancialProducts} from "../../../hooks/useFinancialProducts.tsx";

interface ComponentProps {

}


const ListFinancialProducts: React.FC<ComponentProps> = () => {

    const {dataStore} = useContext(StoreContext);

    // @ts-ignore
    const {financialProductsList} = dataStore

    const {data, alerts, setAlerts, fetchFinancialProducts} = useFinancialProducts();
    const [filteredData, setFilteredData] = useState<FinancialProduct[]>(data);
    const [search, setSearch]: StateType<string> = useState("");

    useEffect(() => {
        setFilteredData(financialProductsList);
    }, [data, financialProductsList]);

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleSearch = useCallback((text: string) => {
        setSearch(text);
        const newData = data.filter((item: FinancialProduct) => {
            const itemData = `${item.name.toUpperCase()} ${item.id}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
    }, [data]);

    const handleAlertClose = useCallback(async () => {
        setAlerts((prev: any) => ({...prev, isVisible: false}));
        if (alerts.error) {
            await fetchFinancialProducts();
        }
    }, [alerts.error, fetchFinancialProducts, setAlerts]);

    const handleAddFinancialProduct = useCallback(() => {
        navigation.navigate("AddFinancialProduct", {
            onGoBack: fetchFinancialProducts,
        });
    }, [navigation, fetchFinancialProducts]);

    const handleDetailFinancialProducts = useCallback((detail: FinancialProduct) => {
        dataStore?.DetailFinancialProducts(detail);
        navigation.navigate("DetailFinancialProducts");
    }, [dataStore, navigation]);

    const renderItem = useCallback(({item}: { item: FinancialProduct }) => (
        <TouchableOpacity
            onPress={() => handleDetailFinancialProducts(item)}
            style={tw`p-3 border-b border-slate-200 flex-row items-center justify-between`}
        >
            <View>
                <Text style={tw`text-gray-900 font-semibold`}>{item.name}</Text>
                <Text style={tw`text-slate-500 text-xs`}>{`ID: ${item.id}`}</Text>
            </View>
            {arrowIcon}
        </TouchableOpacity>
    ), [handleDetailFinancialProducts]);


    return (
        <View style={tw`flex-1 bg-white`}>
            <Header/>
            {data?.length > 0 ? (
                <View style={tw`flex-1 p-6`}>
                    <TextInput
                        style={[tw`border rounded-lg px-2 border-slate-400 w-full`, {height: 48}]}
                        placeholder="Buscar"
                        value={search}
                        onChangeText={handleSearch}
                    />
                    <View style={tw`border border-slate-200 rounded-xl mt-5`}>
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={data.length + 5}
                            removeClippedSubviews={true}
                        />
                    </View>
                </View>
            ) : (
                <View style={tw`flex-1 p-6`}>
                    <NoData text="Sin registros"/>
                    <SubmitButton
                        bgColor={yellowColor}
                        textColor={blueColor}
                        text="Agregar"
                        loading={false}
                        top={0}
                        onPress={handleAddFinancialProduct}
                    />
                </View>
            )}

            {data?.length > 0 && (
                <View style={tw`p-6`}>
                    <SubmitButton
                        bgColor={yellowColor}
                        textColor={blueColor}
                        text="Agregar"
                        loading={false}
                        top={0}
                        onPress={handleAddFinancialProduct}
                    />
                </View>
            )}

            <Loading isLoading={data?.length === 0} labelText="Cargando..."/>

            <MobileAlertsMessages
                isVisible={alerts.isVisible}
                body={alerts.body}
                head={alerts.head}
                textButton={alerts.textButton}
                icon={alerts.icon}
                handleOnPress={handleAlertClose}
            />
        </View>
    );
};

export default observer(ListFinancialProducts);
