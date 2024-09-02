import React from "react";
import { Text } from "react-native";
import tw from "twrnc";

interface ComponentProps {
  text: string;
  color: string;
  font: string;
  size: number;
  left: number;
  top: number;
  bottom?: number; // Hacer que bottom sea opcional
}

const Label: React.FC<ComponentProps> = ({ text, color, font, size, left, top, bottom }) => {
  return (
    <Text
      style={[
        tw`shrink`,
        { color, fontWeight: font, fontSize: size, marginLeft: left, marginTop: top, marginBottom:bottom ?? 0},
      ]}
      allowFontScaling={false}
    >
      {text}
    </Text>
  );
};

export default Label;
