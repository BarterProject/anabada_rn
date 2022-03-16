import React from "react";

import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Message = styled.Text``;
const Main = () => (
  <Container>
    <Message>home</Message>
  </Container>
);

export default Main;
