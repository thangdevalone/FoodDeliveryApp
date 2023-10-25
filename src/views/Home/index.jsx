import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LogoImage, RowBannerImage } from '../../../assets';
import foodsApis from '../../api/foodsApi';
import { FocusStatusBar } from '../../utils/FocusStatusBar';
import { ColorApp } from '../../utils/colors';
import FoodCompo from './FoodCompo';
import TypeCompo from './TypeCompo';
import TypeCompoSkeleton from './TypeCompoSkeleton';


const HomeScreen = ({ navigation }) => {
  const [food, setFood] = useState();
  const [type, setType] = useState();
  useEffect(() => {
    (async () => {
      try {
        const [res1, res2] = await Promise.all([
          foodsApis.getFood(),
          foodsApis.getType(),
        ]);

        // res1 và res2 lần lượt chứa kết quả của foodsApis.getFood() và foodsApis.getType()
        setFood(res1);
        setType(res2);
      } catch (error) {
        // Xử lý lỗi nếu có bất kỳ promise nào bị reject.
        console.error('An error occurred:', error);
      }
    })(); 
  }, []);
  return (
    <SafeAreaView>
      <FocusStatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView >
        <View className="h-screen bg-white">
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowRadius: 6,
              shadowOpacity: 0.2,
              elevation: 10,
            }}
            className="flex flex-row px-4 pb-3 items-center justify-between bg-white w-screen">
            <LogoImage />
            <TouchableOpacity
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                borderRadius: 100,
                elevation: 3,
              }}
              className="mr-4 mt-4 p-2 bg-white">
              <Icon name="search" size={25} color="#000" />
            </TouchableOpacity>
          </View>
          <View className="px-4 w-full relative">
            <RowBannerImage style={{width: '100%'}} />
            <Text className="absolute top-[40px] left-[30px] font-semibold text-[16px] text-black">
              Combo hoàn hảo
            </Text>
            <TouchableOpacity
              style={{backgroundColor: ColorApp.color_red, borderRadius: 20}}
              className="py-1 px-3 absolute top-[85px] left-[30px]">
              <Text className="text-white font-semibold">Đặt hàng</Text>
            </TouchableOpacity>
          </View>
          <View className="px-4 mb-2">
            <Text className="text-black font-semibold text-xl mb-2">Loại</Text>
            {type ? (
              <FlatList
                data={type}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TypeCompo img={item.imgType} text={item.nameType} id={item.id} />
                )}
              />
            ) : (
              <FlatList
                data={[1, 2, 3]}
                horizontal={true}
                keyExtractor={item => item}
                renderItem={() => <TypeCompoSkeleton />}
              />
            )}
          </View>
          <View className="px-4 mb-2">
            <Text className="text-black font-semibold text-xl mb-2">Phổ biến</Text>
            {food ? (
              <FlatList
                data={food}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={({item}) => (  
                    <FoodCompo item={item}/>
                )}
              />
            ) : (
              <FlatList
                data={[1, 2, 3]}
                horizontal={true}
                keyExtractor={item => item}
                renderItem={() => <TypeCompoSkeleton />}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen ;
