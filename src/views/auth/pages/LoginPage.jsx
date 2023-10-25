import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, ProgressBar, Title} from 'react-native-paper';
import {Path, Svg} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {BgLogImage, LogoWImage} from '../../../../assets';
import {TextField} from '../../../components/FormControls';
import PasswordField from '../../../components/FormControls/PasswordField';
import {DismisssKeyboard} from '../../../utils/DismissKeyboard';
import {ColorApp} from '../../../utils/colors';
import useKeyboardStatus from '../../../utils/useKeyboardStatus';
import {authActions} from '../AuthSlice';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Adjust the marginTop to create space for the status bar
  },
});
function LoginPage() {
  const logging = useSelector(state => state.auth.logging);
  const actionAuth = useSelector(state => state.auth.actionAuth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const keyboardStatus = useKeyboardStatus();

  const InitialLoginForm = {
    username: '',
    password: '',
  };
  const schema = yup.object().shape({
    username: yup.string().required('Cần nhập tên đăng nhập'),
    password: yup.string().required('Cần nhập mật khẩu'),
  });

  useEffect(() => {
    if (actionAuth == 'Failed') {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: 'Tài khoản hoặc mật khẩu không chính xác',
      });
    }
    if (actionAuth == 'Success') {
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đăng nhập thành công',
      });
    }
  }, [actionAuth]);

  const form = useForm({
    defaultValue: InitialLoginForm,
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(authActions.login(data));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <DismisssKeyboard>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          
          
          <>
            <View
              className="absolute z-[1] w-screen"
              style={{top: -StatusBar.currentHeight + 10}}>
              <Svg
                width="100%"
                height="197"
                viewBox="0 0 428 197"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M428 0H0V145.332L214 197L428 145.332V0Z"
                  fill="#35B6FF"
                />
              </Svg>
            </View>
            <View className="absolute z-[10] w-full">
            {logging && (
            <ProgressBar
              indeterminate={true}
              className="absolute z-[2] top-0 left-0 w-screen"
            />
          )}
            <Toast position="top" />

            </View>
            <View
              className="absolute z-[4] w-screen"
              style={{
                top: -StatusBar.currentHeight + 20,
                height: 190,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LogoWImage style={{width: '60%'}} />
            </View>
            <View
              className="pt-[120] bg-white h-[100%]"
              style={{paddingBottom: keyboardStatus ? 40 : 0}}>
              <BgLogImage style={{width: '100%'}} />
              <View className="mt-[200] px-[30] absolute z-10 w-screen h-[100%]">
                <View className="flex mb-[20px] justify-center items-center">
                  <Title className="text-3xl font-medium mt-[10px]  text-black">
                    Đăng nhập
                  </Title>
                </View>
                <FormProvider {...form}>
                  <TextField name="username" label="Tên tài khoản" />
                  <PasswordField name="password" label="Mật khẩu" />
                  <TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 5,
                      }}
                      className="text-gray-400 font-medium">
                      Quên mật khẩu?
                    </Text>
                  </TouchableOpacity>
                  <Button
                    style={{
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                    mode="contained"
                    className="my-3 bg-[#35B6FF]"
                    disabled={logging}
                    labelStyle={{color:"white"}}
                    onPress={form.handleSubmit(onSubmit)}>
                    <Text className="text-base">Đăng nhập</Text>
                  </Button>
                </FormProvider>
              </View>
              <View
                className="absolute z-10 items-center justify-center w-screen "
                style={{
                  bottom: 10,
                  flex: 1,
                }}>
                <Text className="font-medium">Chưa có tài khoản?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <View className="mt-1 flex-row items-center">
                    <Text
                      style={{color: ColorApp.text_link}}
                      className="font-medium">
                      Đăng ký ngay
                    </Text>
                    <View className="ml-1">
                      <Svg
                        width="14"
                        height="19"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <Path
                          d="M5.50004 10.9167C2.50986 10.9134 0.0866578 8.49017 0.083374 5.49999V5.39166C0.14292 2.41494 2.59378 0.0442991 5.57082 0.0837995C8.54787 0.1233 10.935 2.55814 10.9155 5.53538C10.8961 8.51263 8.47735 10.9161 5.50004 10.9167ZM5.50004 1.16666C3.10681 1.16666 1.16671 3.10676 1.16671 5.49999C1.16671 7.89322 3.10681 9.83332 5.50004 9.83332C7.89328 9.83332 9.83337 7.89322 9.83337 5.49999C9.83069 3.10787 7.89216 1.16934 5.50004 1.16666ZM4.71462 8.20832L3.94871 7.44186L5.8635 5.52707L3.94871 3.61228L4.71462 2.84582L7.39587 5.52707L4.71517 8.20832H4.71462Z"
                          fill="#0072C5"
                        />
                      </Svg>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </ScrollView>
      </DismisssKeyboard>
    </SafeAreaView>
  );
}

export default LoginPage;
