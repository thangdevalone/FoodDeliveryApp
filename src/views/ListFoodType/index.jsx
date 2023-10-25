import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import foodsApis from '../../api/foodsApi';
import Icon from 'react-native-vector-icons/Ionicons';
import {FocusStatusBar} from '../../utils/FocusStatusBar';
import { Button, Surface } from 'react-native-paper';
import { handlePrice } from '../../utils/handlePrice';
const ListFoodTypeScreen = ({route, navigation}) => {
  const {idType, nameType} = route.params;
  const [foodData, setFoodData] = useState();
  useEffect(() => {
    (async () => {
      try {
        const data = await foodsApis.getListFoodType(idType);
        setFoodData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [idType]);
  const handleBack = () => {
    navigation.goBack();
  };
  console.log(foodData)
  return (
    <SafeAreaView style={{flex: 1}} className="bg-white">
      <FocusStatusBar backgroundColor="white" barStyle="dark-content" />
      <View className="flex-row px-5 py-2 items-center">
        <TouchableWithoutFeedback onPress={handleBack}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableWithoutFeedback>
        <Text className="ml-3 text-xl text-black capitalize">{nameType}</Text>
      </View>
      {foodData ? (
        <>
          <ScrollView className="p-2">
            {foodData.map(item => (
              <TouchableWithoutFeedback
                key={item.id}
                onPress={() => {
                  navigation.navigate('DetailFoodScreen', {idFood: item.id});
                }}>
                <Surface
                  elevation={2}
                  className="bg-white mb-3 mx-2 mt-2 rounded-xl pl-2 pr-4 py-3">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Image
                        resizeMode="contain"
                        style={{width: 70, height: 80}}
                        source={{
                          uri: `${item.imgFood}`,
                        }}
                      />
                      <View className="flex-col  ml-2">
                        <Text className="text-lg font-semibold line-clamp-1 capitalize text-black">
                          {item.nameFood}
                        </Text>
                        <Text className="text-base font-semibold text-black">
                          {handlePrice(item.price)} VND
                        </Text>
                      </View>
                    </View>
                    <Button   mode="contained-tonal">
                      Xem ngay
                    </Button>
                  </View>
                </Surface>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text className=" ml-[10px] text-black text-xl">Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default ListFoodTypeScreen;
