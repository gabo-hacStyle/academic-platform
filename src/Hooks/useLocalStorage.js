// useLocalStorage.js

import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Obtenemos el valor almacenado en localStorage al iniciar el hook
  const storedValue = localStorage.getItem(key);
  //If it´s the first time
  const setItems = () => {
    localStorage.setItem(key, JSON.stringify(initialValue))
    return initialValue
  }
  const initialData = storedValue ? JSON.parse(storedValue) : setItems();

  // Creamos un estado local para almacenar los datos
  const [data, setData] = useState(initialData);

  // Función para guardar los datos en localStorage y actualizar el estado local
  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  // Función para añadir un item a la data existente
  const addItem = (item) => {
    item.id = data.length + 1;
    const newData = [...data, item];
    saveData(newData);
  };

  // Función para editar un item en la data existente
  const editItem = (index, updatedItem) => {
    const newData = [...data];
    //We are editing not through the index, but through the item id
    const realIndex = index - 1;
    newData[realIndex] = updatedItem;
    saveData(newData);
  };

  return { data, setData, addItem, editItem };
};

export default useLocalStorage;
