import { fetchCountries, fetchStates } from "./useAxios";
//All the imports on this file
import axios from "axios";

export const getCountries = async () => {
    return await fetchCountries();
};
//If you wanna also get states
export const getStates = async (selectedCountry) => {
    if (selectedCountry) {
      const tokenResponse = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: {
          'Accept': 'application/json',
          'api-token': '2WHo2gTMQ0DNpHj_MYeQgOxu2GdtD8RnpdwYXDsez4be5B5S8JrSHZutj2tpWCPefbw',
          'user-email': 'gabo2023brazil@gmail.com'
        }
      });

      if (tokenResponse.data.auth_token) {
        const auth_token = tokenResponse.data.auth_token;

        return await fetchStates(auth_token, selectedCountry);
      }
    } 
  };