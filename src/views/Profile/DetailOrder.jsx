import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button, Surface} from 'react-native-paper';
import {FocusStatusBar} from '../../utils/FocusStatusBar';
import {BgDfFoodWImage} from '../../../assets';
import {handlePrice} from '../../utils/handlePrice';

const DetailOrder = ({route, navigation}) => {
  const {data, total} = route.params;

  return (
    <SafeAreaView style={{flex: 1,position:'relative', backgroundColor: '#EDEDED'}}>
      <FocusStatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />

      <View className="items-center mt-20" style={{flex: 1}}>
        <Surface
          style={{width: '90%', borderRadius: 10, backgroundColor: 'white'}}
          elevation={2}>
            <View className="flex-col  justify-center items-center px-3 py-5">
              <Text className="text-black text-xl font-semibold my-3">
                Chi tiết đơn hàng
              </Text>
          <ScrollView>
              {data.map(item => {
                return (
                  <View
                    key={item.id}
                    style={{}}
                    className="flex-row items-center mb-4 gap-4 justify-between w-full">
                    <Image
                      resizeMode="contain"
                      style={{width: 50, height: 50}}
                      source={{
                        uri: item.imgFood,
                      }}
                    />
                    <Text className="capitalize line-clamp-1 text-base">
                      {item.nameFood}*{item.quantity}
                    </Text>
                    <Text>{handlePrice(item.quantity * item.price)} VND</Text>
                  </View>
                );
              })}
                <Text className="mb-2 text-black font-semibold text-base">
                Tổng tiền: {total} VND
              </Text>
              <Text className="mb-1">Thời gian giao tới: Hôm nay</Text>
              </ScrollView>
            
            </View>
        </Surface>
      </View>
      <View className="flex-row justify-center mt-5 mb-10">
        <Button
          mode="contained"
          labelStyle={{fontSize: 18}}
          contentStyle={{paddingVertical: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          Trở về
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default DetailOrder;
