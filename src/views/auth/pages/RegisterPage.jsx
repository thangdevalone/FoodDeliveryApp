import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import {ColorApp} from '../../../utils/colors';
import {authActions} from '../AuthSlice';
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    position: 'relative', // Adjust the marginTop to create space for the status bar
  },
});
function RegisterPage() {
  const logging = useSelector(state => state.auth.logging);
  const actionAuth = useSelector(state => state.auth.actionAuth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const InitialLoginForm = {
    name: '',
    phoneNum: '',
    address:'',
    username: '',
    password: '',
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    username: yup.string().required('Cần nhập tên đăng nhập'),
    password: yup.string().required('Cần nhập mật khẩu'),
    address: yup.string().required('Cần nhập tài khoản'),
    name: yup.string().required('Cần nhập họ và tên'),
    phoneNum: yup
      .string()
      .required('Cần nhập số điện thoại')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(9, 'Quá ngắn')
      .max(11, 'Quá dài'),
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
      navigation.replace('AppLayout');
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
    <SafeAreaView className="bg-white">
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        {logging && (
          <ProgressBar
            indeterminate={true}
            className="absolute z-[2] top-0 left-0 w-screen"
          />
        )}
        <View
          className="absolute z-[1] w-screen"
          style={{top: -StatusBar.currentHeight - 20}}>
          <Svg
            width="100%"
            height="197"
            viewBox="0 0 428 197"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path d="M428 0H0V145.332L214 197L428 145.332V0Z" fill="#35B6FF" />
          </Svg>
        </View>
        <View
          className="absolute z-[4] w-screen"
          style={{
            top: -StatusBar.currentHeight - 10,
            height: 190,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LogoWImage style={{width: '60%'}} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="pt-[100] bg-white h-[100%] ">
            <Toast position="top" />
            <BgLogImage style={{width: '100%'}} />
            <View className="mt-[150] px-[30] absolute z-10 w-screen h-[100%]">
              <View className="flex mb-[20px] justify-center items-center">
                <Title className="text-3xl font-medium mt-[10px]  text-black">
                  Đăng ký
                </Title>
              </View>
              <FormProvider {...form}>
                <TextField name="name" label="Họ và tên" />
                <TextField name="address" label="Địa chỉ" />
                <TextField name="phoneNum" label="Số điện thoại" />
                <TextField name="username" label="Tên tài khoản" />
                <PasswordField name="password" label="Mật khẩu" />
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
                  onPress={form.handleSubmit(onSubmit)}>
                  <Text className="text-base">Đăng nhập</Text>
                </Button>
              </FormProvider>
            </View>
            <View
              className="absolute  z-10 items-center justify-center w-screen "
              style={{bottom: 10, flex: 1}}>
              <Text className="font-medium">Đã có tài khoản</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View className="mt-1 flex-row items-center">
                  <Text
                    style={{color: ColorApp.text_link}}
                    className="font-medium">
                    Đăng nhập
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

export default RegisterPage;
