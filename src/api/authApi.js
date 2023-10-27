
import axiosClient from './axiosClient';



const authApi={
    login(data){
        const url="login"
    
        return axiosClient.post(url,data)
    },
    register(data){
        const url="register"
        const form={address:data.address,password:data.password,username:data.username,std:data.phoneNum,fullname:data.name}
        return axiosClient.post(url,form)
    },
    update(data){
        const url="update-user-info"
        return axiosClient.put(url,data)
    }
}
export default authApi