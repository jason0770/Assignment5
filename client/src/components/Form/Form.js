import React, { useEffect, useRef, useState } from "react";
import "./Form.css";
import FormInput from "./FormInput";
import FormRadio from "./FormRadio";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addItemsAsync } from "../../features/itemSlice";
import FormFileInput from "./FormFileInput";

// Question1: Should I put the file reader in Redux Thunk?
// Question2: Does it make more sense to have image reader function execute during the time of clicking on add button?
const RADIO_OPTIONS = {
  URL: "url",
  URI: "uri",
};

// Source: https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
const readURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (event) => reject(event);
  });
};

export default function Form({ testClick }) {
  // the prop is for the react-testing library and it should not affect the original the form rendering.
  const dispatch = useDispatch();

  const [radioOption, setRadioOption] = useState(RADIO_OPTIONS.URL);
  const [itemSKU, setItemSKU] = useState("");
  const [itemManufacturer, setItemManufacturer] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImageLink, setItemImageLink] = useState("");
  const [itemImageFileLabel, setItemImageFileLabel] = useState("");
  const fileInput = useRef(null);

  useEffect(() => {
    if (
      fileInput.current !== null &&
      fileInput.current !== "" &&
      radioOption === RADIO_OPTIONS.URI
    ) {
      // Source: https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
      const renderImageContent = async () => {
        if (
          (typeof fileInput.current === "object" &&
            fileInput.current !== undefined) ||
          (fileInput.current !== undefined &&
            !fileInput.current.startsWith("data:image"))
        ) {
          const result = await readURL(fileInput.current);
          fileInput.current = result;
        }
      };
      void renderImageContent();
    }
  }, [fileInput.current]);

  useEffect(() => {
    setItemImageLink("");
    setItemImageFileLabel("");
  }, [radioOption]);

  return (
    <div className="form-section">
      <h1 className="form-section__title">
        A Form for a Product you Purchased
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (radioOption === RADIO_OPTIONS.URL) {
            dispatch(
              addItemsAsync({
                itemName: itemName,
                itemSKU: itemSKU,
                itemManufacturer: itemManufacturer,
                itemDescription: itemDescription,
                itemPrice: itemPrice,
                itemImageLink: itemImageLink,
              })
            );
          } else {
            dispatch(
              addItemsAsync({
                itemName: itemName,
                itemSKU: itemSKU,
                itemManufacturer: itemManufacturer,
                itemDescription: itemDescription,
                itemPrice: itemPrice,
                itemImageLink: fileInput.current,
              })
            );
          }
          setItemName("");
          setItemSKU("");
          setItemManufacturer("");
          setItemDescription("");
          setItemPrice("");
          setItemImageLink("");
          setItemImageFileLabel("");
          fileInput.current = null;
        }}
        className="purchase-form"
        method="post"
      >
        <fieldset className="purchase-form__fieldset">
          <legend className="purchase-form__legend">
            Product Purchase Form
          </legend>

          <FormInput
            forName={"itemName"}
            labelName={"Item Name:"}
            inputType={"text"}
            inputId={"itemName"}
            inputName={"itemName"}
            onChange={(e) => setItemName(e.target.value)}
          />
          <FormInput
            forName={"itemSKU"}
            labelName={"Item SKU:"}
            inputType={"text"}
            inputId={"itemSKU"}
            inputName={"itemSKU"}
            onChange={(e) => setItemSKU(e.target.value)}
          />
          <FormInput
            forName={"itemManufacturer"}
            labelName={"Item Manufacturer:"}
            inputType={"text"}
            inputId={"itemManufacturer"}
            inputName={"itemManufacturer"}
            onChange={(e) => setItemSKU(e.target.value)}
          />
          <FormInput
            forName={"itemDescription"}
            labelName={"Description:"}
            inputType={"text"}
            inputId={"itemDescription"}
            inputName={"itemDescription"}
            onChange={(e) => setItemDescription(e.target.value)}
          />
          <FormInput
            forName={"itemPrice"}
            labelName={"Price:"}
            inputType={"number"}
            inputId={"itemPrice"}
            inputName={"itemPrice"}
            onChange={(e) => setItemPrice(e.target.value)}
            step={"any"}
          />

          {/* <!--Source: https://www.w3.org/WAI/tutorials/forms/grouping/--> */}
          <fieldset className="purchase-form__image-item-options">
            <legend className="purchase-form__image-item-options-title">
              Image of Item Options
            </legend>

            <div>
              <FormRadio
                forName={"url"}
                labelName={"Post a Image Link"}
                idName={"url"}
                name={"item-image"}
                value={radioOption}
                defaultChecked={
                  radioOption === RADIO_OPTIONS.URL ? true : false
                }
                onChange={(e) => setRadioOption(RADIO_OPTIONS.URL)}
              />
            </div>

            <div className="purchase-form__image-item-file-option">
              <FormRadio
                forName={"uri"}
                labelName={"Upload a File"}
                idName={"uri"}
                name={"item-image"}
                value={radioOption}
                defaultChecked={
                  radioOption === RADIO_OPTIONS.URI ? true : false
                }
                onChange={(e) => setRadioOption(RADIO_OPTIONS.URI)}
              />
            </div>
          </fieldset>
          {radioOption === RADIO_OPTIONS.URL ? (
            <div className="purchase-form__item-image-link-section">
              <FormInput
                forName={"itemImageLink"}
                labelName={"Image Link:"}
                inputType={"url"}
                inputId={"itemImageLink"}
                inputName={"itemImageLink"}
                value={itemImageLink}
                onChange={(e) => setItemImageLink(e.target.value)}
              />
            </div>
          ) : (
            // {/* <!--Source: https://www.w3schools.com/tags/att_hidden.asp--> */}
            <div className="purchase-form__item-image-file-section">
              <FormFileInput
                forName={"itemImageLink"}
                labelName={"File Address:"}
                inputType={"file"}
                inputId={"itemImageLink"}
                inputName={"itemImageLink"}
                value={itemImageFileLabel}
                onChange={(e) => {
                  setItemImageFileLabel(e.target.value);
                  fileInput.current = e.target.files[0];
                }}
              />
            </div>
          )}

          <Button
            className="purchase-form__button purchase-form__button_green"
            btnType={"reset"}
            onClick={() => {
              setItemImageLink("");
              setItemImageFileLabel("");
              fileInput.current = null;
            }}
          >
            Clear
          </Button>
          {testClick === undefined || testClick === null ? (
            <Button
              className="purchase-form__button purchase-form__button_green"
              btnType={"submit"}
            >
              Add
            </Button>
          ) : (
            <Button
              className="purchase-form__button purchase-form__button_green"
              onClick={testClick}
            >
              Add
            </Button>
          )}
        </fieldset>
      </form>
    </div>
  );
}
