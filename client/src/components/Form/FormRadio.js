import React from 'react'

export default function FormRadio(props) {
  return (
    <>
        <label className="purchase-form__image-item-file-label" htmlFor={props.forName}>
            {props.labelName}
        </label>
        <input
            className="purchase-form__radio"
            type="radio"
            id={props.idName}
            name={props.name}
            value={props.value}
            // Source: https://stackoverflow.com/questions/32174317/how-to-set-default-checked-in-checkbox-reactjs
            defaultChecked={props.defaultChecked}
            onChange={props.onChange}
        />
    </>
  )
}
