import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

export const useUserInfor = () => {
  const user= useSelector(state=>state.auth.currentUser) || null
  return user;
}