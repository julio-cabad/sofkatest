import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import LottieView from "lottie-react-native";
import Label from "./Label.tsx";


interface ComponentProps {
  text: string;
}

const NoData: React.FC<ComponentProps> = ({ text }) => {

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <LottieView source={require("../../../assets/animations/noData.json")} autoPlay loop
                  style={{ height: 210, width: 250 }} />
      <Label text={text} color={"gray"} font={"400"} size={12} left={0} top={1} />
    </View>
  );
};


export default NoData;
