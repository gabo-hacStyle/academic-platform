//This file's taks is to connect and fetch the data from the backend of your app
//or external APIs
import axios from "axios";

//This code is an example of how to fecth the data from an api 
//Like your own database (backend)
//Using axios

//Uncomment and fix according to your code needs

/**
 
const baseUrl = 'http://localhost:4000';

//Function to connect the server and receive a token (login Page for example)
//the data might be the email and password brought from a login page
  export const getToken = async (data) => {
      try {
        const response = await axios.post(baseUrl + '/auth/login', data);
        return response;
      } catch (error) {
        console.error('Error connecting to the server:', error);
        throw error;
      }
    };

  //Axios instance  
  export const instanceBackend = axios.create({
      baseURL: baseUrl,
      timeout: 4000,
  })

 //Function to get all data that is an array, the endpoint can be: 
  //-Simple uri (/courses)
  //-Filters (/users?location=USA&gender=M)
  //A combined uri ('/users/' + id + '/grades')

  export const getAnything = async (endpoint) => {
    try {
      const response = await instanceBackend.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error getting the items:', error);
      throw error;
    }
  };

  //To bring a single item, which will return an object, not array
  export const getItemById = async (endpoint) => {
    try {
      const response = await instanceBackend.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error al obtener el item:', error);
      throw error;
    }
}

  //Function to post data
  
  export const postData = async (data, endpoint) => {
      try{
        console.log(data)
          const response = await instanceBackend.post(baseUrl + endpoint, data)
          console.log(response.data)
      } catch (error) {
          console.error(error)
      }
  }

  //Function to edit data

  export const editData = async (data, endpoint) => {
      try{
          const response = await instanceBackend.put(baseUrl + endpoint, data)
          console.log(response.data)
      } catch (error) {
          console.error(error)
      }
}
 * 
 */


//Getting external APIs
const fetchCountries = async () => {
  try {
    const tokenResponse = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        'Accept': 'application/json',
        'api-token': '2WHo2gTMQ0DNpHj_MYeQgOxu2GdtD8RnpdwYXDsez4be5B5S8JrSHZutj2tpWCPefbw',
        'user-email': 'gabo2023brazil@gmail.com',
      }
    });

    if (tokenResponse.data.auth_token) {
      const auth_token = tokenResponse.data.auth_token;

      const countriesResponse = await axios.get('https://www.universal-tutorial.com/api/countries/', {
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Accept': 'application/json'
        }
      });

      return countriesResponse.data;
    }
  } catch (error) {
    console.log('Error al obtener países:', error);
    return [];
  }
};

const fetchStates = async (auth_token, country) => {
  try {
    const response = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Accept': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.log('Error al obtener estados:', error);
    return [];
  }
};


export { fetchCountries, fetchStates }