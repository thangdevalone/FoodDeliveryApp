
import axiosClient from './axiosClient';



const authApi={
    login(data){
        const url="login"
    
        return axiosClient.post(url,data)
    },
    register(data){
        const url="register"
        const form={address:data.address,password:data.password,username:data.username,sdt:data.phoneNum,fullname:data.name}
        return axiosClient.post(url,form)
    }
}
export default authApi