import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { Text, View } from "react-native";
import Checkbox from "expo-checkbox";

import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";

import Slide from "./components/Slide";

import { InputTitle, InputContent } from "./utils";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.ScrollView`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const Btn = styled.TouchableOpacity``;

const Inputs = styled.View`
  padding: 0 25px;
`;

const InputColumn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  margin: 15px 0;
`;

const InputMoney = styled(InputTitle)`
  height: 35px;
  width: 100px;
  margin: 0;
`;

const ImageText = styled.Text`
  color: #626262;
  font-weight: 300;
  font-size: 20px;
`;

const StatusText = styled.Text`
  color: black;
  font-size: 20px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  background-color: #e94057;
  color: white;
  justify-content: center;
  align-items: center;
`;

function Enroll({
  navigation: { setOptions },
}: {
  navigation: { setOptions: Function };
}) {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setOptions({
      headerBackTitleVisible: false,
      title: "",
      headerLeft: () => (
        <Btn
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>
            <Ionicons size={30} name="chevron-back-outline" />
          </Text>
        </Btn>
      ),
      headerRight: () => null,
    });
  }, []);

  return (
    <KeyboardAwareScrollView extraScrollHeight={30}>
      <Container>
        <Slide />
        <Inputs>
          <InputTitle placeholder="제품명" />
          <InputContent
            placeholder="설명"
            multiline
            numberOfLines={10}
            style={{ textAlignVertical: "top" }}
          />
          <InputColumn>
            <ImageText>보증금</ImageText>
            <InputMoney />
          </InputColumn>
          <StatusText>
            <Ionicons size={20} name="warning" color="#ffe222" />
            계좌번호 0000-000-00000에 계좌이체 하셔야 등록이 완료됩니다.
          </StatusText>
          <InputColumn>
            <ImageText>계약명세서 (더보기)</ImageText>
            <View style={{ flexDirection: "row" }}>
              <ImageText>동의</ImageText>
              <Checkbox
                style={{ marginLeft: 10 }}
                value={isChecked}
                onValueChange={setChecked}
              />
            </View>
          </InputColumn>
          <Button style={{ marginBottom: 20 }}>
            <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
              등록완료
            </Text>
          </Button>
        </Inputs>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default Enroll;
