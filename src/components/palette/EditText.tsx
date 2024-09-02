import React from "react";
import {Text, View, TextInputProps, TextInput} from "react-native";
import tw from "twrnc";
import Label from "./Label.tsx";
import {blueColor} from "../utils/Colors.tsx";

type PropsInput = TextInputProps & {
    label: string;
    top: number;
    max: number;
    field: string;
    handleChange: (field: string, text: string) => void;
    values: { [key: string]: string };
    setFieldValue: (field: string, value: any) => void;
    errors?: any;
    editable: boolean
};


const EditText = ({
                      label,
                      top,
                      field,
                      errors,
                      handleChange,
                      values,
                      setFieldValue,
                      max,
                      editable,
                      ...props
                  }: PropsInput): React.JSX.Element => {

    const handleChangeText = (text: string) => {
        handleChange(field, text);
        setFieldValue(field, text);
    };


    return (
        <View style={[tw`w-full`, {marginTop: top}]}>
            <Label text={label} color={blueColor} font={"400"} size={11} left={5} top={0}/>
            <TextInput
                style={[tw`border rounded-lg px-2 border-slate-400`, {height: 48,}]}
                value={values[field]}
                maxLength={max}
                editable={editable}
                onChangeText={handleChangeText}
                {...[props]}
            />
            {!!errors[field] !== undefined &&
                <Text style={tw`text-red-500 text-xs ml-2`}>{errors[field]}</Text>}
        </View>
    );
};


export default EditText;
