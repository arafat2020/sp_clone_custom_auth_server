import axios from "axios";
import { SERVER_URL_$ } from "./serverConfig";

export async function login({ code }) {
  if (code) {
    axios.post(`${SERVER_URL_$}/login`, {
      code: code,
    }).then(res=>{
      
      console.log(res.data);
      return res.data
    }).catch(err=>{

      console.log(err);
      return err
    })
  } else {
    return;
  }
}
