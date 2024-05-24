import axios from "axios";
import { UserFormState } from "../screens/AuthScreen";
import { BACKEND_LINK } from "../util/constants";
export function storeUser(userData : UserFormState){
    

}
export async function getAllPlangeri(){
    try{
      const response = await axios.get(BACKEND_LINK + "/getAllPlangeri")
        return response.data
    }catch(error){
        console.log(error);
    }
    
}
export async function getPlangereId(plangereIdd:string){
    const plangere = {plangereId:plangereIdd}
    try{
        const response = await axios.get(BACKEND_LINK + "/getPlangereById",{params:plangere})
        return response.data
    }catch(err){
        console.log(err)
    }
}