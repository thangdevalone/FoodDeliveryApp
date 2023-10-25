import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Surface} from 'react-native-paper';
import PMInput from '../../components/Common/PMInput';
import {handlePrice} from '../../utils/handlePrice';
import {cartActions} from './CartSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const FoodItem = ({item}) => {
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const handleChangeValueCart = quan => {
    const changeData = {
      id: item.id,
      quantity: quan,
    };
    dispatch(cartActions.setValue(changeData));
  };
  return (
    <Surface elevation={2} className="bg-white mb-3 mx-2 mt-2 rounded-xl pl-2 pr-4 py-3">
      <View className="flex-row justify-between items-center">
       <TouchableWithoutFeedback onPress={()=>{navigation.navigate("DetailFoodScreen",{idFood:item.id})}}>
        <View className="flex-row items-center">
          <Image
            resizeMode="contain"
            style={{width: 70, height: 80}}
            source={{
              uri: `${item.imgFood}`,
            }}
          />
          <View className="flex-col  ml-2">
            <Text className="text-lg font-semibold line-clamp-1 capitalize text-black">{item.nameFood}</Text>
            <Text className="text-base font-semibold text-black">
              {handlePrice(item.quantity * item.price)} VND
            </Text>
          </View>
        </View>
   </TouchableWithoutFeedback>
        <PMInput value={item.quantity} setValue={handleChangeValueCart} />
      </View>
    </Surface>
  );
};

export default FoodItem;
