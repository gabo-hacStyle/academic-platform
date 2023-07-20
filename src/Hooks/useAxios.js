import axios from "axios";

//to use & manipulate backend data
const baseUrl = 'http://localhost:4000';

//Function to connect the server and receive a token
export const getToken = async (data) => {
    try {
      const response = await axios.post(baseUrl + '/auth/login', data);
      return response;
    } catch (error) {
      console.error('Error al conectarse al servidor:', error);
      throw error;
    }
  };

//Function to get data from backend
export const instanceBackend = axios.create({
    baseURL: baseUrl,
    timeout: 4000,
})


export const getCourses = async () => {
  try {
    const response = await instanceBackend.get('/courses');
    return response;
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    throw error;
  }
};
  
  export const getPrograms = async () => {
    try {
      const response = await instanceBackend.get('/programs');
      return response;
    } catch (error) {
      console.error('Error al obtener programas:', error);
      throw error;
    }
  };
  export const getLocations = async () => {
    try {
      const response = await instanceBackend.get('/options/locations');
      return response;
    } catch (error) {
      console.error('Error al obtener locations:', error);
      throw error;
    }
  };
  
  export const getUsers = async (endpoint) => {
    try {
      const response = await instanceBackend.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  };
export const getItemById = async (endpoint) => {
    try {
      const response = await instanceBackend.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error al obtener el item:', error);
      throw error;
    }
}

//function to fetch enrollments with a speceific uri
export const getEnrollments = async (id) => {
    try {
      const response = await instanceBackend.get('/users/' + id + '/courses');
      return response;
    } catch (error) {
      console.error('Error al obtener inscripciones:', error);
      throw error;
    }
  };
  


const postData = async (data, endpoint) => {
    try{
      console.log(data)
        const response = await instanceBackend.post(baseUrl + endpoint, data)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

const editData = async (data, endpoint) => {
    try{
        const response = await instanceBackend.put(baseUrl + endpoint, data)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

//Get external APIs

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


export { postData, editData, fetchCountries, fetchStates }