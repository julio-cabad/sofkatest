import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Modal from "react-native-modal";
import Label from "./Label.tsx";
import { blueColor } from "../utils/Colors.tsx";


interface ComponentProps {
  isVisible: boolean;
  body: string;
  head: string;
  textButton: string;
  icon: any;
  handleOnPress: () => void;
}

const MobileAlertsMessages: React.FC<ComponentProps> = ({ isVisible, head, handleOnPress, body, icon, textButton }) => {


  return (
      <Modal isVisible={isVisible} backdropOpacity={0.35} animationIn={"zoomInUp"} animationInTiming={500}>

        <View style={[tw`items-center justify-center flex-1`]}>

          <View style={[tw`rounded-2xl bg-white items-center justify-between w-full`, { width: 300 }]}>
            <View style={tw`w-full items-center mt-4`}>
              {icon}
            </View>

            <View style={tw`w-full  items-center  mt-3 px-6`}>
              <Label text={head} color={"black"} font={"700"} size={22} left={0} top={0} />
            </View>

            <View style={tw`w-full  items-center  mt-3 px-6 text-center`}>
              <Label text={body} color={"#333"} font={"400"} size={14} left={0} top={0} />
            </View>

            <TouchableOpacity style={tw`p-4 mt-3 border-t w-full justify-center items-center border-slate-300`}
                              onPress={handleOnPress}>
              <Label text={textButton} color={blueColor} font={"400"} size={16} left={0} top={0} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};


export default MobileAlertsMessages;
