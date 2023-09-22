
import axiosClient from './axiosClient';



const authApi={
    login(data){
        const url="auth/login"
    
        return axiosClient.post(url,data)
    },
    register(data){
        const url="auth/register"
        const form={accountName:data.name,password:data.password,username:data.username,sdt:data.phoneNumber}
        return axiosClient.post(url,form)
    },
    hello(){
        const url="auth/hello"
        return axiosClient.get(url)
    }
}
export default authApi