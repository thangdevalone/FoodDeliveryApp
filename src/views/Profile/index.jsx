import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { FocusStatusBar } from '../../utils/FocusStatusBar'
import { FF1Image } from '../../../assets'
import { useUserInfor } from '../../hooks'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { authActions } from '../auth/AuthSlice'

const Profile= () => {
  const user=useUserInfor()
  console.log(user)
  const dispatch=useDispatch()
  const handleLogOut=()=>{
    dispatch(authActions.logOut())
  }
  return (
    <SafeAreaView style={{flex:1,marginBottom:55,backgroundColor:"white"}}>
      <FocusStatusBar backgroundColor="white" barStyle="dark-content" />
      <View className="">
        <View className="flex-row mt-5 mb-1 p-[10px]">
          <FF1Image style={{width:80,height:80}}/>
          <View className="flex-col ml-2 mt-1">
            <Text className="text-xl text-black font-semibold mb-1">{user.fullname}</Text>
            <Text>Số điện thoại: {user?.std || "Không có sẵn"}</Text>
            <Text>Địa chỉ: {user?.address || "Không có sẵn"}</Text>
          </View>
        </View>
        <View className="flex-row justify-between mx-5">
        <Button mode="contained" >
          Chỉnh sửa          
        </Button>
        <Button mode="outlined" onPress={handleLogOut} >
          Đăng xuất         
        </Button>
        </View>
        <View className="bg-slate-300 w-full my-5 h-[4px]"></View>
        <View className="px-5">
          <Text className="text-xl font-semibold text-black">Lịch sử đơn hàng</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile