import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux';
import { setBankName } from '../../../slice';

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
  const dispatch = useDispatch();
  const items = [
    { label: '카카오', value: '카카오' },
    { label: '국민', value: '국민' },
    { label: '우리', value: '우리' },
    { label: '신한', value: '신한' },
  ];
  return (
    <RNPickerSelect
      onValueChange={(value) => {
        setBank(value);
        dispatch(setBankName(value));
      }}
      style={pickerSelectStyles}
      value={bank}
      // placeholder={{ label: '국민' }}
      items={items}
    />
  );
}
