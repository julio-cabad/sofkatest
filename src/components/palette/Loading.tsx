import React from "react";
import {Image, Modal, Platform, StatusBar, StyleSheet, Text, View} from "react-native";
import tw from "twrnc";
import LottieView from "lottie-react-native";


interface ComponentProps {
  isLoading: boolean;
  labelText: string;
}

const Loading: React.FC<ComponentProps> = ({isLoading, labelText}) => {

  return (
    <Modal transparent visible={isLoading}>
      <View style={styles.modalContainer}>
        <View style={[tw`w-full items-center justify-center`]}>
          <LottieView source={require("../../../assets/animations/loading.json")} autoPlay loop
                      style={{height: 250, width: 400}}/>
          <Text style={tw`text-slate-600 text-xs`}>{labelText}</Text>
        </View>
      </View>
    </Modal>
  );
};


export default Loading;

const styles = StyleSheet.create({

  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
