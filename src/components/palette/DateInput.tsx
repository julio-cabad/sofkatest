import React, { useState } from "react";
import { Text, View, TextInputProps, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { StateType } from "../utils/Const.tsx";
import Label from "./Label.tsx";
import { blueColor } from "../utils/Colors.tsx";
import { calendarIcon } from "../utils/Icons";

type PropsInput = TextInputProps & {
  label: string;
  top: number;
  field: string;
  values: { [key: string]: string };
  errors?: any;
  onPress: () => void;
  calendar: boolean;
};


const DateInput = ({
                     label,
                     top,
                     field,
                     errors,
                     values,
                     onPress,
                     calendar,
                     ...props
                   }: PropsInput): React.JSX.Element => {

  ;

  return (
    <View style={[tw`w-full`, { marginTop: top }]}>
      <Label text={label} color={blueColor} font={"400"} size={11} left={5} top={0} />
      <View style={[tw`w-full flex-row border rounded-lg border-slate-400`, { height: 48 }]}>
        <View style={[tw`px-2 w-full justify-center`, { width: calendar ? "80%" : "100%" }]}>
          <Label text={values[field]} color={"#333"} font={"400"} size={14} left={0} top={0} />
        </View>
        {calendar && <TouchableOpacity onPress={onPress}
                                       style={[tw`rounded-lg items-end pr-1 justify-center`, {
                                         height: 48, width: "20%"
                                       }]}>
          {calendarIcon}
        </TouchableOpacity>}
      </View>
      {!!errors[field] !== undefined &&
        <Text style={tw`text-red-500 text-xs ml-2`}>{errors[field]}</Text>}
    </View>
  );
};


export default DateInput;
