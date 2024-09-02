import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import tw from "twrnc";
import Label from "./Label.tsx";

type PropsButton = TouchableOpacityProps & {
  bgColor: string;
  textColor: string;
  text: string;
  loading: boolean;
  top: number;
};
const SubmitButton = ({
                        bgColor,
                        textColor,
                        text,
                        loading,
                        top,
                        ...props
                      }: PropsButton): React.JSX.Element => {
  return (
    <TouchableOpacity
      style={[tw`rounded-lg p-3 items-center justify-center flex-row`,
        { backgroundColor: bgColor, marginTop: top }]}
      {...props}>
      {loading && <ActivityIndicator color={"#FFF"} size={"small"} />}
      <Label color={textColor} font={"600"} left={loading ? 5 : 0} size={16} text={text} top={0} />
    </TouchableOpacity>
  );
};

export default SubmitButton;
