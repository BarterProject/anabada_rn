import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import Main from "./AlarmStack/Main";

import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const Btn = styled.TouchableOpacity``;

const Alarm = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerBackTitleVisible: false,
        title: "",
        headerLeft: () => (
          <Btn
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>
              <Ionicons size={30} name="arrow-back-outline" />
            </Text>
          </Btn>
        ),
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

export default Alarm;
