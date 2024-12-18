import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#693FB7]  h-[48px] rounded-lg w-full items-center justify-center"
    >
      <Text className="text-white text-[16px]">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
