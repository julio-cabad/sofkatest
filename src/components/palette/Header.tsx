import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Label from "./Label.tsx";
import { blueColor } from "../utils/Colors.tsx";
import { headerIcon } from "../utils/Icons";

interface ComponentProps {

}


const Header: React.FC<ComponentProps> = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={tw`w-full p-4 items-center flex-row justify-center border-b border-slate-200`}>
      {headerIcon}
      <Label text={"BANCO"} color={blueColor} font={"800"} size={22} left={7} top={0} />
    </View>
  );
};

export default Header;
