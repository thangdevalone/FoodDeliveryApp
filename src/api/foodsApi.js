import axiosClient from "./axiosClient";

const foodsApis = {
    getType() {
        const url = "get-all-type";
        return axiosClient.get(url);
    },
    getFood(){
        const url="get-all-food"
        return axiosClient.get(url)
    },
    getDetailFood(id){
        const url=`find-food?id=${id}`
        return axiosClient.post(url)
    },
    getListFoodType(id){
        const url=`find-type?id=${id}`
        return axiosClient.post(url)
    }
  
};

export default foodsApis