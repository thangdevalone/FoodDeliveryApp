import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { handlePrice } from '../../utils/handlePrice';


const FoodCompo = props => {
  const {item} = props;
  const navigation=useNavigation()
  return (
     <TouchableWithoutFeedback onPress={()=>{navigation.navigate("DetailFoodScreen",{idFood:item.id})}}>
      <View className="my-2 mx-3" >
      <Shadow distance={8} startColor='#00000015' className="items-center rounded-xl py-2 px-3 ">
     <Image
        resizeMode="contain"
        style={{width: 120, height: 80}}
        source={{
          uri: `${item.imgFood}`,
        }}
      />
      <Text className="font-semibold text-black text-base capitalize">{item.nameFood}</Text>
      <Text className="text-gray-400 font-semibold">NeedFood</Text>
      <Text className="text-[18px] font-semibold text-black mt-1">{handlePrice(item.price)} VND</Text>
     </Shadow>
     </View>
     </TouchableWithoutFeedback>
  );
};

export default FoodCompo;
