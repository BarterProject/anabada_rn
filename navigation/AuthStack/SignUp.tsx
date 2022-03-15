import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import styled from 'styled-components/native';

import auth from '@react-native-firebase/auth';

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`;

const CodeInput = styled.TextInput`
  background-color:skyblue;
  width:100px;
`;

export default function SignUp() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const response = await confirm.confirm(code);
      if (response) {
        alert('Phone Auth 성공!');
        // return (
        //   <Container>
        //     <Text>Phone Auth 성공! </Text>
        //   </Container>
        // )
      }
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  if (!confirm) {
    return (
      <Container>
        <Text>테스트</Text>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+8201063666208')}
        />
      </Container>
    );
  }
  return (
    <Container>
      <Text>테스트</Text>
      <CodeInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </Container>
  );
  // return (
  //   <Container>
  //     <Text>
  //       Auth-SignUp
  //     </Text>
  //   </Container>
  // );
}
