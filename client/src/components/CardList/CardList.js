import "./CardList.css";

import React from "react";
import ItemCard from "./ItemCard";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAllItemAsync,
  getItemsAsync,
} from "../../features/itemSlice";
import Button from "../Button";
import { useEffect } from "react";

export default function CardList() {
  const items = useSelector((storeState) => storeState.cardList.items.itemList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsAsync());  // eslint-disable-line react-hooks/exhaustive-deps
  });

  return (
    <div className="item-card-list">
      <h2 className="item-card-list__title">Item Card List</h2>
      <div className="item-card-list__content item-card_fade">
        {items === undefined ? (
          <div>Loading data from a server...</div>
        ) : (
          <>
            {items.length === 0 ? (
              <div>Empty</div>
            ) : (
              <>
                {/* Source: https://legacy.reactjs.org/docs/lists-and-keys.html*/}
                {items.map((originalItem, index) =>
                  // Source: https://stackoverflow.com/questions/73566501/react-returns-undefined-and-later-the-data-with-fetch-api
                  // Source: https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
                  {
                    return index % 2 === 0 ? (
                      <ItemCard
                        key={index}
                        styleType={"darkblue"}
                        index={index}
                        itemId={originalItem["itemId"]}
                        itemName={originalItem["itemName"]}
                        itemSKU={originalItem["itemSKU"]}
                        itemManufacturer={originalItem["itemManufacturer"]}
                        itemDescription={originalItem["itemDescription"]}
                        itemURL={originalItem["itemImageLink"]}
                        itemPrice={originalItem["itemPrice"]}
                      />
                    ) : (
                      <ItemCard
                        key={index}
                        styleType={"lightblue"}
                        index={index}
                        itemId={originalItem["itemId"]}
                        itemName={originalItem["itemName"]}
                        itemSKU={originalItem["itemSKU"]}
                        itemManufacturer={originalItem["itemManufacturer"]}
                        itemDescription={originalItem["itemDescription"]}
                        itemURL={originalItem["itemImageLink"]}
                        itemPrice={originalItem["itemPrice"]}
                      />
                    );
                  }
                )}
              </>
            )}
          </>
        )}
      </div>
      <Button
        onClick={() => dispatch(deleteAllItemAsync())}
        className="item-card-list__delete-all-button"
      >
        Delete All
      </Button>
    </div>
  );
}
