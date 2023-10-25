import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {FocusStatusBar} from '../utils/FocusStatusBar';
import {Button, Surface} from 'react-native-paper';
import { BgDfFoodWImage, TickImage } from '../../assets';
import { handlePrice } from '../utils/handlePrice';

const Payment = ({route,navigation}) => {
  const {total}=route.params
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EDEDED'}}>
      <FocusStatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <BgDfFoodWImage style={{width: '100%'}} />
      <View className="items-center mt-10" style={{flex:1}}>
      <Surface style={{width:'80%',borderRadius:10,backgroundColor:'white'}} elevation={2}>
        <View className="flex-col justify-center items-center px-3 py-5">
          <TickImage style={{width:50}}/>
          <Text className="text-black text-xl font-semibold my-3">Thanh toán thành công</Text>
          <Text className="mb-1">Số tiền: {total} VND</Text>
          <Text className="mb-1">Thời gian giao tới: Hôm nay</Text>
        </View>
      </Surface>
      </View>

      <View className="flex-row justify-center mb-10">
      <Button mode="contained" labelStyle={{fontSize:18}} contentStyle={{paddingVertical:5}} onPress={()=>{navigation.navigate('Home')}}>
        Trang chủ
      </Button>
      </View>

    </SafeAreaView>
  );
};

export default Payment;
