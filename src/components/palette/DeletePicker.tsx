import React, { useCallback, useMemo } from "react";
import { Keyboard, Text, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Label from "./Label.tsx";
import SubmitButton from "./SubmitButton.tsx";
import { blueColor, grayColor, yellowColor } from "../utils/Colors.tsx";

interface ComponentProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  handleDelete: () => void;
  name: string;
}


const DeletePicker: React.FC<ComponentProps> = ({ bottomSheetModalRef, handleDelete, name }) => {

  const snapPoints = useMemo(() => ["35%", "36%"], []);
  // @ts-ignore
  const handleSheetChanges = useCallback((index: number) => index === -1 && bottomSheetModalRef.current.close(), []);

  return (
    <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}
                      containerStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <View style={tw`p-6 flex-1`}>
        <Label text={`Esta seguro de borrar el producto ${name}?`} color={"#333"} font={"500"} size={14} left={0}
               top={0} />

        <SubmitButton bgColor={yellowColor} textColor={blueColor} text={"Confirmar"} loading={false} top={25}
                      onPress={() => handleDelete()} />

        <SubmitButton bgColor={grayColor} textColor={blueColor} text={"Cancelar"} loading={false} top={15}
        onPress={()=>bottomSheetModalRef.current?.close()}/>

      </View>
    </BottomSheetModal>
  );
};


export default DeletePicker;
