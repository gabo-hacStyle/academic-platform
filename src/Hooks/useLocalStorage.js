// useLocalStorage.js

import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Obtenemos el valor almacenado en localStorage al iniciar el hook
  const storedValue = localStorage.getItem(key);
  const initialData = storedValue ? JSON.parse(storedValue) : initialValue;

  // Creamos un estado local para almacenar los datos
  const [data, setData] = useState(initialData);

  // Función para guardar los datos en localStorage y actualizar el estado local
  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  // Función para añadir un item a la data existente
  const addItem = (item) => {
    const newData = [...data, item];
    saveData(newData);
  };

  // Función para editar un item en la data existente
  const editItem = (index, updatedItem) => {
    const newData = [...data];
    newData[index] = updatedItem;
    saveData(newData);
  };

  return { data, setData, addItem, editItem };
};

export default useLocalStorage;
