import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, deleteItemAsync } from "../../features/itemSlice";
import Modal from "../Modal/Modal";
import Button from "../Button";

export default function ItemCard(props) {
  const [isViewClicked, setIsViewClicked] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={"item-card item-card_" + props.styleType + " item-card_show"}
      >
        <div className="item-card__main">
          <section className="item-card__content">
            <h3 className="item-card__title">
              {"ID." + props.itemId + ": " + props.itemName}
            </h3>
          </section>
          <div>
            <section className="item-card__sku">
              <h3>{"SKU Code: " + props.itemSKU}</h3>
            </section>
            <section className="item-card__manufacturer">
              <h3>{"Manufacturer: " + props.itemManufacturer}</h3>
            </section>
          </div>

          {/* <div className="item-card__user-info-button-section">
            <Button className={"item-card__button"}>Purchasers</Button>
            <Button className={"item-card__button"}>Reviews</Button>
          </div> */}
          <div className="item-card__button-section">
            <Button
              onClick={() => setIsViewClicked(true)}
              className={"item-card__button"}
            >
              View
            </Button>
            <Button
              onClick={() => dispatch(deleteItemAsync(props.itemId))}
              className="item-card__button"
            >
              Delete
            </Button>
          </div>
        </div>
        <aside className="item-card-image">
          <h3 className="item-card-image__title">Image of {props.itemName}</h3>
          <figure className="item-card-image__figure">
            <img
              className="item-card-image__content"
              src={props.itemURL}
              alt={props.itemName}
            />
            <figcaption className="item-card-image__captions">
              Hardcover of {props.itemName}
            </figcaption>
          </figure>
        </aside>
      </div>

      {/* Source: https://www.youtube.com/watch?v=LyLa7dU5tp8 */}
      <div onClick={() => console.log("clicked")}>
        {isViewClicked && (
          <Modal
            itemId={props.index}
            isViewClicked={isViewClicked}
            setIsViewClicked={() => setIsViewClicked(false)}
          />
        )}
      </div>
    </>
  );
}
