import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { BgDfFoodWImage } from '../../../assets';
import foodsApis from '../../api/foodsApi';
import PMInput from '../../components/Common/PMInput';
import { LocationColor } from '../../components/Icons';
import { FocusStatusBar } from '../../utils/FocusStatusBar';
import { handlePrice } from '../../utils/handlePrice';
import { cartActions } from '../Cart/CartSlice';
import Toast from 'react-native-toast-message';
const DetailFoodScreen = ({route, navigation}) => {
  const {idFood} = route.params;
  const [foodData, setFoodData] = useState();
  const [visible, setVisible] = useState(false);
  const cartData = useSelector(state => state.cart.cartData);
  const existingItem = cartData.find(item => item.id === idFood);
  const [quantity, setQuantity] = useState(
    String(existingItem?.quantity || 1) 
  );
  const hideDialog = () => setVisible(false);
  useEffect(() => {
    (async () => {
      try {
        const data = await foodsApis.getDetailFood(idFood);
        setFoodData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [idFood]);
  const handleBack = () => {
    navigation.goBack();
  };
  const dispatch = useDispatch();
  const handleAddCart = () => {
    const data = {
      ...foodData,
      quantity: quantity,
    };

    dispatch(cartActions.addItem(data));
    hideDialog()
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Thêm vào giỏ hàng thành công',
    });
  };
 
  return (
    <SafeAreaView style={{flex: 1}} className="bg-white">
      <FocusStatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      {foodData ? (
        <>
          <Portal>
            <Dialog
              style={{borderRadius: 8, backgroundColor: 'white'}}
              visible={visible}
              onDismiss={hideDialog}>
              <Dialog.Title className="text-xl">Chọn số lượng </Dialog.Title>
              <Dialog.Content>
                <PMInput value={quantity} setValue={setQuantity} />
                <Text>
                  Thành tiền : {handlePrice(quantity * foodData.price)} VND
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Hủy</Button>
                <Button onPress={handleAddCart}>Thêm vào giỏ</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <ScrollView>
            <Toast position='top'/>
            <View className="relative mt-[-25px] h-screen">
              <TouchableWithoutFeedback onPress={handleBack}>
                <View className="absolute z-10 top-[70px] left-[15px]">
                  <Icon name="arrow-back" size={30} color="#000" />
                </View>
              </TouchableWithoutFeedback>
              <BgDfFoodWImage style={{width: '100%'}} />
              <View className="absolute w-screen flex-1 flex-row top-[150px] justify-center">
                <Image
                  resizeMode="contain"
                  style={{width: 250, height: 200}}
                  source={{
                    uri: `${foodData.imgFood}`,
                  }}
                />
              </View>
              <View className="mt-[40px] py-[20px] px-[15px] ">
                <View className="flex-row justify-between gap-2 items-center px-[10]">
                  <Text className="text-black font-semibold text-3xl capitalize">
                    {foodData.nameFood}
                  </Text>
                  <Text className="text-black font-semibold text-xl">
                    {handlePrice(foodData.price)} VND
                  </Text>
                </View>
                <View className="flex-row items-center mt-5">
                  <LocationColor size={25} />
                  <Text className="ml-2 text-base">NeedFood</Text>
                </View>
                <View className="mt-10">
                  <Text className="text-xl text-black">Mô tả</Text>
                  <Text className="mt-2 text-base">{foodData.detail}</Text>
                </View>
                <View className="flex-row items-center justify-center mt-5 mx-2">
                  {existingItem ? (
                    <Button mode="contained-tonal" onPress={()=>navigation.navigate("Cart")}>
                      Đã có trong giỏ
                    </Button>
                  ) : (
                    <Button
                      mode="contained-tonal"
                      onPress={() => {
                        setVisible(true);
                      }}>
                      Thêm vào giỏ hàng
                    </Button>
                  )}
                 
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text className="mt-[35] ml-[10px] text-black text-xl">Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default DetailFoodScreen;
