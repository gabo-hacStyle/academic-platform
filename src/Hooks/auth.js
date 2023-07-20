import React, { useContext } from 'react';
import { getToken, instanceBackend } from './useAxios';
import { useNavigate } from 'react-router-dom';
import { setUsers, setCourses, setPrograms } from '../Slices/dataSlice';
import { useDispatch } from 'react-redux';
import { setFilters } from '../Slices/filtersSlice';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //States: roles
  const [role, setRole] = React.useState(null);
  //State: isAuthenticaded
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  //Funcion para setear el token
  instanceBackend.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

  const login = async (user) => {
    console.log('login: ' + user);
    //Bring the token
    await getToken(user)
    .then(
      (response) => {   
         localStorage.setItem('token', response.data.access_token);
          //Put the token in the localstorage
          //If the user.email includes admin then set role to 1
          if (user.email.includes('admin')) {
            setRole(1);
            setIsAuthenticated(true);
            navigate('/admin', {replace: true});
          } else {
            setRole(4);
            setIsAuthenticated(true);
            navigate('/staff', {replace: true});
          }   
      }
    )
    .catch((error) => {
      console.log(error.response.data.error);
      console.log('oasasdjsa')
      
    });
  };
  
  const logout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    dispatch(setUsers([]));
    dispatch(setCourses([]));
    dispatch(setPrograms([]));
    dispatch(setFilters({
      locations: [],
      courses: [],
      genders: [],
      ages: [],
      programs: [],
    }));
    setRole(null);
    setIsAuthenticated(false);
    navigate('/', {replace: true});

  };
  
  const auth = { login, logout, role, isAuthenticated};

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export {
  AuthProvider,
  useAuth,
};