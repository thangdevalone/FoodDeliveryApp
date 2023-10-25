import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {useNavigation} from '@react-navigation/native';

const TypeCompo = props => {
  const {text, img, id} = props;
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ListFoodTypeScreen', {idType: id,nameType:text});
      }}>
      <View className="my-3 mx-2">
        <Shadow
          distance={8}
          startColor="#00000015"
          className="items-center rounded-xl py-2 px-3 ">
          <Image
            resizeMode="contain"
            style={{width: 70, height: 70}}
            source={{
              uri: `${img}`,
            }}
          />
          <Text className="text-black text-base capitalize font-semibold">
            {text}
          </Text>
        </Shadow>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TypeCompo;
