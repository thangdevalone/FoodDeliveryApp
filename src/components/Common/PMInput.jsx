import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

const PMInput = ({value,setValue}) => {

  const handleTextChange = (inputText) => {
    // Loại bỏ các ký tự không phải số khỏi văn bản đầu vào
    const newText = inputText.replace(/[^0-9]/g, '');

    // Kiểm tra nếu giá trị là lớn hơn hoặc bằng 1
    if (parseInt(newText) >= 1) {
      setValue(newText);
    }
  };

  const increaseValue = () => {
    const newValue = parseInt(value) + 1;
    setValue(newValue.toString());
  };

  const decreaseValue = () => {
    if (parseInt(value) > 1) {
      const newValue = parseInt(value) - 1;
      setValue(newValue.toString());
    }
  };

  return (
    <View style={{ flexDirection: 'row',gap:10, alignItems: 'center' }}>
      <TouchableOpacity onPress={decreaseValue}>
        <View style={{ backgroundColor: '#FF8982', borderRadius: 100, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
          <Icons name="minus" size={20} color="#000" />
        </View>
      </TouchableOpacity>
      <TextInput
        onChangeText={handleTextChange}        
        style={{ fontSize: 22, textAlign:'center' }}
        value={value}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={increaseValue}>
        <View style={{ backgroundColor: '#FF8982', borderRadius: 100, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
          <Icons name="plus" size={20} color="#000" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PMInput;
