const API_URL = process.env.VUE_APP_API_URL;
import axios from "axios";

const realizarAccionApi = async (datos) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL + "/register-action", datos)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  realizarAccionApi,
};
