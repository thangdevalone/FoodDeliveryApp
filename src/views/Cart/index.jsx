import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Button, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {FocusStatusBar} from '../../utils/FocusStatusBar';
import {handlePrice} from '../../utils/handlePrice';
import {cartActions} from './CartSlice';
import FoodItem from './FoodItem';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const renderRightActions = (progress, dragX, onClick) => {
  return (
    <View
      style={{
        margin: 0,
        alignContent: 'center',
        justifyContent: 'center',
        width: 70,
      }}>
      <Button onPress={onClick}>Xóa</Button>
    </View>
  );
};

const Cart = ({navigation}) => {
  const cartData = useSelector(state => state.cart.cartData);
  const dispatch = useDispatch();
  let row = [];
  let prevOpenedRow;
  const handleBack = () => {
    navigation.goBack();
  };
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  const [total,setTotal]=useState(handlePrice(
    cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
  )||0)
  useEffect(()=>{
    setTotal(handlePrice(
      cartData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    ))
  },[cartData])
  return (
    <SafeAreaView
      style={{flex: 1, position: 'relative', marginBottom: 55}}
      className="bg-white">
      <FocusStatusBar
        backgroundColor="white"
        translucent={false}
        barStyle="dark-content"
      />
      <View className="flex-row h-[30px] items-center justify-between mt-[10px] mx-5">
        <View className="flex-row items-center">
          <TouchableWithoutFeedback onPress={handleBack}>
            <Icon name="arrow-back" size={30} color="#000" />
          </TouchableWithoutFeedback>
          <Text className="ml-3 text-xl text-black">Giỏ hàng</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch(cartActions.deleteCart());
          }}>
          <MIcon name="delete" size={30} color="red" />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        <GestureHandlerRootView>
          <View className="mt-8 px-[15px]">
            {cartData.length > 0 ? (
              <>
                {cartData.map((item, index) => (
                  <Swipeable
                    key={item.id}
                    renderRightActions={(progress, dragX) =>
                      renderRightActions(progress, dragX, () => {
                        dispatch(cartActions.removeItem(item.id));
                      })
                    }
                    onSwipeableOpen={() => closeRow(index)}
                    ref={ref => (row[index] = ref)}
                    rightOpenValue={-100}>
                    <FoodItem item={item} />
                  </Swipeable>
                ))}
              </>
            ) : (
              <Text>Giỏ hàng rỗng</Text>
            )}
          </View>
        </GestureHandlerRootView>
      </ScrollView>
      {cartData.length > 0 && (
        <View className="flex-row mb-2 justify-center">
          <Surface
            elevation={1}
            style={{borderRadius: 10, marginBottom: 10}}
            className="px-5 py-5 w-[90%] bg-white">
            {cartData.map(item => (
              <View key={item.id} className="flex-row justify-between">
                <Text className="capitalize">
                  {item.nameFood}*{item.quantity}
                </Text>
                <Text>{handlePrice(item.quantity * item.price)} VND</Text>
              </View>
            ))}
            <View className="flex-row justify-between mt-2">
              <Text className="font-semibold text-black text-xl">
                Tổng tiền
              </Text>
              <Text className="font-semibold text-black text-xl">
                {total}{' '}
                VND
              </Text>
            </View>
            <Button
              mode="contained-tonal"
              className="mt-4"
              onPress={()=>{navigation.navigate('Payment',{total:total});dispatch(cartActions.deleteCart())}}
              labelStyle={{fontSize: 18}}>
              Xác nhận mua
            </Button>
          </Surface>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
