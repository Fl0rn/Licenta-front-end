import axios from "axios";
import { BACKEND_LINK } from "./constants";
export function postInDb<T>(route: string, data: T){
axios.post(BACKEND_LINK + route)
}