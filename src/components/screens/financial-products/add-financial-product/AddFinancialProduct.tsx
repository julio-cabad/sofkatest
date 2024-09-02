import React, { useCallback, useContext, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import tw from "twrnc";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Header from "../../../palette/Header.tsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import {
  addFinancialProductSchema,
  initialFinancialProductsValues,
} from "../../../utils/YupSchemas.tsx";
import EditText from "../../../palette/EditText.tsx";
import DateInput from "../../../palette/DateInput.tsx";
import SubmitButton from "../../../palette/SubmitButton.tsx";
import { blueColor, grayColor, yellowColor } from "../../../utils/Colors.tsx";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CalendarSheetPicker from "../../../palette/CalendarSheetPicker.tsx";
import { StoreContext } from "../../../../stores/Context.tsx";
import { observer } from "mobx-react-lite";
import axios from "axios";
import MobileAlertsMessages from "../../../palette/MobileAlertsMessages.tsx";
import { checkIcon, errorIcon } from "../../../utils/Icons";
import Loading from "../../../palette/Loading.tsx";

interface AddFinancialProductProps {}

interface FormValues {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const AddFinancialProduct: React.FC<AddFinancialProductProps> = () => {
  const { dataStore } = useContext(StoreContext);
  // @ts-ignore
  const { BASE_URL } = dataStore;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isOK, setIsOK] = useState<boolean>(false);
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const [msjText, setMsjText] = useState<{ head: string; body: string }>({
    head: "AVISO",
    body: "",
  });


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const bottomSheetCalendarRef = useRef<BottomSheetModal>(null);
  const handlePresentCalendarPress = useCallback(
      () => bottomSheetCalendarRef.current?.present(),
      []
  );

  const handleConfirm = useCallback(() => {
    setIsVisible(false);
    if (isOK) {
      navigation.navigate("ListFinancialProducts");
    }
  }, [isOK, navigation]);

  const validateId = async (id: string): Promise<boolean> => {
    const url = `${BASE_URL}/bp/products/verification/${id}`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      setIcon(errorIcon);
      setIsVisible(true);
      setMsjText({
        head: "ERROR",
        body: "Ha ocurrido un error, intentelo nuevamente",
      });
      return false;
    }
  };

  const onSubmit = async (
      values: FormValues,
      { resetForm }: { resetForm: () => void }
  ) => {
    Keyboard.dismiss();
    const { id } = values;
    setIsLoading(true);

    const isIdValid = await validateId(id);

    if (isIdValid) {
      setIsLoading(false);
      setIcon(errorIcon);
      setIsVisible(true);
      setMsjText({
        head: "AVISO",
        body: "Este ID ya ha sido registrado",
      });
      return;
    }

    const url = `${BASE_URL}/bp/products`;

    try {
      await axios.post(url, values);
      await dataStore?.FinancialProductsList();
      setIsLoading(false);
      setIsOK(true);
      setIcon(checkIcon);
      setIsVisible(true);
      setMsjText({
        head: "PRODUCTO AGREGADO",
        body: "Producto agregado exitosamente",
      });
      resetForm();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setIcon(errorIcon);
      setIsVisible(true);
      setMsjText({
        head: "AVISO",
        body: "Ha ocurrido un error, intentelo nuevamente",
      });
    }
  };

  return (
      <BottomSheetModalProvider>
        <View style={tw`flex-1 bg-white`}>
          <Header />
          <View style={tw`flex-1 p-6`}>
            <KeyboardAwareScrollView
                automaticallyAdjustContentInsets={false}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={10}
                extraHeight={20}
                contentContainerStyle={{ flexGrow: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
              <Formik
                  validationSchema={addFinancialProductSchema}
                  initialValues={initialFinancialProductsValues}
                  onSubmit={onSubmit}
              >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    setFieldValue,
                    resetForm,
                  }) => (
                    <View style={tw`flex-1`}>
                      <EditText
                          label="ID"
                          top={0}
                          field="id"
                          handleChange={handleChange}
                          values={values}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          max={10}
                          editable
                      />

                      <EditText
                          label="Nombre"
                          top={0}
                          field="name"
                          handleChange={handleChange}
                          values={values}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          max={100}
                          editable
                      />

                      <EditText
                          label="Descripción"
                          top={0}
                          field="description"
                          handleChange={handleChange}
                          values={values}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          max={200}
                          multiline
                          numberOfLines={40}
                          editable
                      />

                      <EditText
                          label="Logo"
                          top={0}
                          field="logo"
                          handleChange={handleChange}
                          editable
                          values={values}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          max={2000}
                      />

                      <DateInput
                          label="Fecha de liberación"
                          top={0}
                          field="date_release"
                          calendar
                          values={values}
                          errors={errors}
                          onPress={handlePresentCalendarPress}
                      />

                      <DateInput
                          label="Fecha de revisión"
                          top={0}
                          field="date_revision"
                          calendar={false}
                          values={values}
                          errors={errors}
                          onPress={handlePresentCalendarPress}
                      />

                      <SubmitButton
                          bgColor={yellowColor}
                          textColor={blueColor}
                          text="Enviar"
                          loading={loading}
                          top={15}
                          onPress={()=>handleSubmit()}
                      />

                      <SubmitButton
                          bgColor={grayColor}
                          textColor={blueColor}
                          text="Reiniciar"
                          loading={loading}
                          top={15}
                          onPress={() => {
                            Keyboard.dismiss();
                            resetForm();
                          }}
                      />

                      <CalendarSheetPicker
                          bottomSheetModalRef={bottomSheetCalendarRef}
                          setFieldValue={setFieldValue}
                      />
                    </View>
                )}
              </Formik>
            </KeyboardAwareScrollView>
          </View>
          <MobileAlertsMessages
              isVisible={isVisible}
              body={msjText.body}
              head={msjText.head}
              textButton="CONFIRMAR"
              icon={icon}
              handleOnPress={handleConfirm}
          />
          <Loading isLoading={loading} labelText="" />
        </View>
      </BottomSheetModalProvider>
  );
};

export default observer(AddFinancialProduct);
