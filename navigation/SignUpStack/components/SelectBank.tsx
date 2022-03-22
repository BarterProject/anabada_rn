import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default function SelectBank() {
  const [bank, setBank] = useState('국민');
  // const items = [
  //   { label: '국민', value: '국민' },
  //   { label: '우리', value: '우리' },
  //   { label: '신한', value: '신한' },
  // ];
  return (
    <RNPickerSelect
      placeholder="은행"
      onValueChange={(value) => { setBank(value); }}
      style={pickerSelectStyles}
      value={bank}
      items={[
        { label: '국민', value: '국민' },
        { label: '우리', value: '우리' },
        { label: '신한', value: '신한' },
      ]}
    />
  );
}
