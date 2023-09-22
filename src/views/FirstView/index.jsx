import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { FF1Image, FF2Image, FF3Image, LogoImage } from '../../../assets';
export default function FirstView({navigation}) {
  const swiperRef = React.useRef(null);
  const dotTranslateX = useSharedValue(0);
  const [val, setVal] = React.useState(0);
  const goToNextSlide = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.state.index;
      const nextIndex = currentIndex + 1;
      // Ensure the nextIndex is within the bounds of the slides
      if (nextIndex < swiperRef.current.state.total) {
        swiperRef.current.scrollBy(1);
      }
      if(nextIndex===3){
        navigation.replace("Login")
      }
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(dotTranslateX.value,{duration:400})}],
  }));
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View className="h-screen bg-white">
        <View className="mb-4 px-4 py-2 w-screen">
          <LogoImage />
        </View>
        <Swiper
          onIndexChanged={index => {
            if (index === 0) {
              dotTranslateX.value = 0;
              setVal(0);
            }
            if (index === 1) {
              dotTranslateX.value = 5;
              setVal(5);
            }
            if (index === 2) {
              dotTranslateX.value = 10;
              setVal(10);
            }
          }}
          ref={swiperRef}
          loop={false}
          paginationStyle={{
            left: -230,
            bottom: 50,
            position: 'absolute',
          }}
          dot={
            <View
              style={{
                backgroundColor: '#FFD7D4',
                width: 10,
                height: 10,
                borderRadius: 8,
                marginLeft: 4,
                marginRight: 4,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          }
          activeDot={
            <View className="flex mx-1 flex-row">
              <Animated.View
                style={[
                  {
                    backgroundColor: '#FF8982',
                    width: 25,
                    height: 10,
                    borderRadius: 8,
                    position: 'absolute',
                    left: -val - 5,
                    zIndex: 2,
                  },
                  animatedStyles,
                ]}
              />
              <View
                style={{
                  backgroundColor: '#FFD7D4',
                  width: 30,
                  height: 10,
                  borderRadius: 8,
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </View>
          }>
          <View className="w-screen items-center flex-1">
            <FF1Image style={{width: '90%'}} />
            <View className="w-screen mt-4 p-5">
              <Text className="text-3xl mb-8 font-semibold text-black">
                Món ăn yêu thích
              </Text>
              <Text className="text-base text-[#6D6D6D]">Menu đa dạng</Text>
            </View>
          </View>
          <View className="w-screen items-center flex-1">
            <FF2Image style={{width: '90%'}} />
            <View className="w-screen mt-4 p-5">
              <Text className="text-3xl mb-8 font-semibold text-black">
                Giá tốt nhất
              </Text>
              <Text className="text-base text-[#6D6D6D]">Menu với nhiều sự lựa chọn</Text>
            </View>
          </View>
          <View className="w-screen items-center flex-1">
            <FF3Image style={{width: '90%', marginTop: 50}} />
            <View className="w-screen mt-4 p-5">
              <Text className="text-3xl mb-8 font-semibold text-black">
                Giao hàng nhanh
              </Text>
              <Text className="text-base text-[#6D6D6D]">Ngay lập tức mang đồ ăn tới bạn</Text>
            </View>
          </View>
        </Swiper>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: 50,
            right: 50,
          }}
          onPress={goToNextSlide}>
          <View
            className="bg-[#5FC5FF] p-8"
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 600,
            }}>
            <Svg
              width="14"
              height="22"
              viewBox="0 0 14 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.8355 12.2272C13.263 11.8545 13.5 11.361 13.5 10.836C13.5 10.307 13.263 9.81223 12.8355 9.44211L2.58599 0.717921C1.99349 0.206046 1.03649 0.206046 0.443994 0.717921C-0.148506 1.2298 -0.148506 2.06192 0.443994 2.57248L10.158 10.8347L0.443994 19.0955C-0.148506 19.6074 -0.148506 20.4395 0.443994 20.9527C1.03649 21.4646 1.99349 21.4646 2.58599 20.9501L12.8355 12.2272Z"
                fill="white"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
