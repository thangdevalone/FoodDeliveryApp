import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {FocusStatusBar} from '../../utils/FocusStatusBar';
import {FF1Image} from '../../../assets';
import {useUserInfor} from '../../hooks';
import {Button, Dialog, Portal, ProgressBar, Surface} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../auth/AuthSlice';
import Toast from 'react-native-toast-message';
import authApi from '../../api/authApi';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextField} from '../../components/FormControls';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const user = useUserInfor();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(authActions.logOut());
  };
  const hideDialog = () => setVisible(false);
  const initForm = {
    fullname: user.fullname,
    std: user.std,
    address: user.address,
  };
  const [loading, setLoading] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    address: yup.string().required('Cần nhập tài khoản'),
    fullname: yup.string().required('Cần nhập họ và tên'),
    std: yup
      .string()
      .required('Cần nhập số điện thoại')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(9, 'Quá ngắn')
      .max(11, 'Quá dài'),
  });
  const form = useForm({
    defaultValues: initForm,
    resolver: yupResolver(schema),
  });
  const navitation=useNavigation()
  const onSubmit = data => {
    (async () => {
      try {
        setLoading(true);
        await authApi.update({...data, id: user.id});
        dispatch(authActions.updateInfor(data));
        hideDialog();
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Sửa thông tin thành công',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Thất bại',
          text2: 'Có lỗi xảy ra',
        });
      } finally {
        setLoading(false);
      }
    })();
  };
  const data = useSelector(state => state.order.data);
  return (
    <SafeAreaView style={{flex: 1, marginBottom: 55, backgroundColor: 'white'}}>
      <Portal>
        <Dialog
          style={{borderRadius: 8, backgroundColor: 'white'}}
          visible={visible}
          onDismiss={hideDialog}>
          <FormProvider {...form}>
            <Dialog.Title className="text-xl">Chỉnh sửa thông tin</Dialog.Title>
            <Dialog.Content>
              <TextField name="fullname" label="Họ và tên" />
              <TextField name="address" label="Địa chỉ" />
              <TextField name="std" label="Số điện thoại" />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Hủy</Button>
              <Button onPress={form.handleSubmit(onSubmit)}>Lưu</Button>
            </Dialog.Actions>
          </FormProvider>
        </Dialog>
      </Portal>
      <View style={{zIndex:20}} className="relative">
        <Toast position="top" />
        {loading && (
          <ProgressBar
            indeterminate={true}
            className="absolute z-[2] top-0 left-0 w-screen"
          />
        )}
      </View>
      <FocusStatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView className="">
        <View className="flex-row mt-5 mb-1 p-[10px]">
          <FF1Image style={{width: 80, height: 80}} />
          <View className="flex-col ml-2 mt-1">
            <Text className="text-xl text-black font-semibold mb-1">
              {user.fullname}
            </Text>
            <Text>Số điện thoại: {user?.std || 'Không có sẵn'}</Text>
            <Text>Địa chỉ: {user?.address || 'Không có sẵn'}</Text>
          </View>
        </View>
        <View className="flex-row justify-between mx-5">
          <Button mode="contained" onPress={() => setVisible(true)}>
            Chỉnh sửa
          </Button>
          <Button mode="outlined" onPress={handleLogOut}>
            Đăng xuất
          </Button>
        </View>
        <View className="bg-slate-300 w-full my-5 h-[4px]"></View>
        <View className="px-5">
          <Text className="text-xl font-semibold mb-4 text-black">
            Lịch sử đơn hàng
          </Text>
          {data &&
            data.map(item => (
              <Surface
                style={{
                  marginBottom: 16,
                  borderRadius: 8,
                  backgroundColor: 'white',
                }}
                key={item.idx}
                elevation={2}>
                <TouchableWithoutFeedback onPress={()=>{navitation.navigate('DetailOrder',{data:item.cart,total:item.total})}}>
                  <View>
                    <View className="px-5 py-4 items-center flex-row justify-between">
                      <Text
                        className="text-base text-black font-semibold"
                        key={item.idx}>
                        Đơn hàng {item.idx + 1}
                      </Text>
                      <Text>{item.total} VND</Text>
                    </View>
                    <Text className="pl-5 pb-4 capitalize line-clamp-1">
                      {item.cart
                        .map(
                          (data, index) =>
                            `${data.nameFood}*${data.quantity}${
                              index < item.cart?.length-1 ? ', ' : ''
                            }`,
                        )
                        .join('')}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </Surface>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
