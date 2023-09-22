import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as yup from 'yup';
import {TextField} from '../../../components/FormControls';
import {yupResolver} from '@hookform/resolvers/yup';
import {Avatar, Button, ProgressBar, Title} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {Copyright} from '../../../components/Common';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../AuthSlice';
import PasswordField from '../../../components/FormControls/PasswordField';
import Toast from 'react-native-toast-message';

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight, // Adjust the marginTop to create space for the status bar
  },
});
function RegisterPage() {
  const [isConfirm, setConfirm] = React.useState(false);
  const registering = useSelector(state => state.auth.registering);
  const actionAuth = useSelector(state => state.auth.actionAuth);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const InitialResgisterForm = {
    username: '',
    password: '',
    sdt: '',
    accountName: '',
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Hãy nhập tên đầy đủ của bạn')
      .test(
        'Họ và tên nên gồm 2 từ trở lên',
        'Họ và tên nên gồm ít nhất 2 từ không bao gồm chữ số',
        value => {
          const words = value.trim().split(' ');
          return words.length >= 2 && words.every(word => !/\d/.test(word));
        },
      ),
    username: yup
      .string()
      .required('Nhập mã sinh viên')
      .test(
        'Mã sinh viên có đủ 5 chữ số',
        'Bắt đầu bằng A và có 5 chữ số đằng sau',
        values => {
          return values.length === 6 && values[0] === 'A';
        },
      )
      .matches(/^A\d{5}$/, 'Mã sinh viên không hợp lệ'),
    phoneNumber: yup
      .string()
      .required('Điền số điện thoại')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(9, 'Quá ngắn')
      .max(11, 'Quá dài'),
    password: yup
      .string()
      .required('Nhập mật khẩu')
      .min(8, 'Mật khẩu phải dài hơn 8 kí tự')
      .max(32, 'Mật khẩu quá dài')
      .matches(/[A-Z]+/, 'Mật khẩu cần ít nhất 1 kí tự in hoa')
      .matches(/[a-z]+/, 'Mật khẩu cần ít nhất 1 kí tự in thường'),
    rePassword: yup
      .string()
      .required('Nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  });
  const form = useForm({
    defaultValue: InitialResgisterForm,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (actionAuth == 'Failed') {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: 'Mã sinh viên đã được sử dụng',
      });
    }
    if (actionAuth == 'Success') {
      navigation.replace('AppLayout');
    }
  }, [actionAuth]);

  const onSubmit = data => {
    dispatch(authActions.register(data));
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}>
        <View>
          {registering && (
            <ProgressBar
              indeterminate={true}
              className="fixed top-0 left-0 w-screen"
            />
          )}
          <View className="p-[30px] h-screen bg-white ">
            <Toast position="top" />
            <View className="mt-[4vh] h-[100%]">
              <View className="flex mb-[20px] justify-center items-center">
                <Avatar.Icon size={40} icon="lock" />
                <Title className="text-3xl mt-[10px]  text-black">
                  Đăng kí
                </Title>
              </View>
              <FormProvider {...form}>
                <TextField name="name" label="Họ và tên" />
                <View className="flex flex-row justify-between">
                  <View className="basis-[48%] ">
                    <TextField name="username" label="Mã sinh viên" />
                  </View>
                  <View className="basis-[50%] ">
                    <TextField name="phoneNumber" label="Số điện thoại" />
                  </View>
                </View>
                <PasswordField name="password" label="Mật khẩu" />
                <PasswordField name="rePassword" label="Nhập lại mật khẩu" />
                <TouchableOpacity onPress={() => setConfirm(!isConfirm)}>
                  <View className="flex flex-row items-center">
                    <CheckBox
                      value={isConfirm}
                      onValueChange={() => setConfirm(!isConfirm)}
                      style={{
                        transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                        marginLeft: -3,
                        marginRight: 5,
                      }}
                    />
                    <Text className="flex-1 text-base text-black">
                      Tôi đã đọc và đồng ý với{' '}
                      <Text className="text-blue-600 text-base underline">
                        Điều khoản và Chính sách bảo mật
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>

                <Button
                  style={{
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  }}
                  mode="contained"
                  className="my-3"
                  disabled={registering || !isConfirm}
                  onPress={form.handleSubmit(onSubmit)}>
                  Đăng kí
                </Button>
                <TouchableOpacity onPress={() => navigation.goBack('Register')}>
                  <Text className="text-blue-600 text-base underline">
                    Bạn đã có tài khoản? Đăng nhập
                  </Text>
                </TouchableOpacity>
                <View className="flex flex-row justify-center mt-[2vh]">
                  <Copyright />
                </View>
              </FormProvider>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterPage;
