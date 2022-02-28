import API_URL from "./config";
import axios from "axios";

async function realizarAccionApi(datos) {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL + "/register-actions", datos)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default realizarAccionApi;
