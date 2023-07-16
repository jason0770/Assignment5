import React, { useState, useRef } from "react";
import "./Modal.css";
import Button from "../Button";
import { useSelector } from "react-redux";
import { createPortal, render } from "react-dom";
import FormInput from "../Form/FormInput";
import { useDispatch } from "react-redux";
import { updateItemsDetailsAsync } from "../../features/itemSlice";

/* Source: https://www.youtube.com/watch?v=LyLa7dU5tp8 */
export default function Modal(props) {
  // const [isDescriptionEditable, setIsDescriptionEditable] = useState(false)
  // const [isPriceEditable, setIsPriceEditable] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  const isViewClicked = props.isViewClicked;
  const setIsViewClicked = props.setIsViewClicked;
  const itemId = props.itemId;
  const items = useSelector((storeState) => storeState.cardList.items.itemList);
  const [itemPrice, setItemPrice] = useState(items[itemId].itemPrice)
  const [itemDescription, setItemDescription] = useState(items[itemId].itemDescription)

  const dispatch = useDispatch()

  return (
    <>
      {console.log(items)}
      {isViewClicked ? (
        createPortal(
          <div className="modal__page modal__page_theme">
            <div className="modal__main modal__main_theme">
              <div className="modal__title">
                ID.{items[itemId].itemId} {items[itemId].itemName}
              </div>

              <textarea disabled={isEditable ? false : true} className="modal__description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                />
                {/* {items[itemId].itemDescription} */}
                {/* {itemDescription} */}
              {/* </textarea> */}

              {isEditable ? 
              <div className="modal__price">
              Price: <FormInput inputType="number" value={itemPrice} onChange={(e)=>setItemPrice(e.target.value)}/>
              </div>
              
              :
              <div className="modal__price">
                {/* Price: {items[itemId].itemPrice} */}
                Price: {itemPrice}
              </div>
              


              }
              
              
              {/* <div className="edit-button__section "> */}
                <Button className={"modal__button modal__button_theme-edit-button"} 
                  onClick={(e)=> {
                    setIsEditable(!isEditable)

                    if (isEditable) {
                      console.log("line 62")
                      dispatch(updateItemsDetailsAsync([items[itemId].itemId, itemDescription, itemPrice]))
                    }
                   
                    console.log("line 42")
                  }}>
                  {isEditable ? "Update" : "Edit"}
                </Button>
                {/* <Button className={"modal__button modal__button_theme-edit-button"}
                  onClick={(e)=> {
                    setIsPriceEditable(!isPriceEditable)
                  }}
                >
                  {isPriceEditable ? "Update Price" : "Edit Price"}
                </Button> */}
              {/* </div> */}
              <Button className={"modal__button"} onClick={setIsViewClicked}>
                Close
              </Button>
            </div>
          </div>,
          document.getElementById("root")
        )
      ) : (
        <></>
      )}
    </>
  );
}
