import React from "react";
import {useDispatch } from "react-redux";
import { setFormToRender, setItemId } from "../../Slices/uiSlice";

const ListItem = ({ key, item, formToRender,itemsToShow, setItemsToShow, setView, view }) => {
  const dispatch = useDispatch();

  const handleView = (id) => {
    setView(true);
    setItemsToShow([...itemsToShow, id]);
  };

  //handle when click on the close button, it closes the view
  const handleClose = (id) => {
    //Deletes the id from the array
    setItemsToShow(itemsToShow.filter((item) => item !== id));
    //If the array is empty, it closes the view
    if (id.length === 0) {
      setView(false);
    }
  };
  // console.log(item)
  return (
    <>
      <li key={key} className="flex items-center justify-between">
        <span>{item.fullName || item.description}</span>
        <div className="w-3/12 gap-3 flex">
          
          <span>
                      {view && itemsToShow.includes(item.id) ? (
                        <button
                          className="clickable"
                          onClick={() => handleClose(item.id)}
                        >
                          Cerrar
                        </button>
                      ) : (
                        <button
                          className="clickable"
                          onClick={() => handleView(item.id)}
                        >
                          Ver
                        </button>
                      )}
                    </span>
          <span>
            <button
              className="clickable"
              onClick={() => {
                dispatch(setItemId(item.id));
                dispatch(setFormToRender(formToRender));
              }}
            >
              Editar
            </button>
          </span>
        </div>
      </li>
    </>
  );
};

export default ListItem;
