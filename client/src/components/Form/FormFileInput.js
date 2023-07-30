import React from 'react'

export default function FormFileInput(props) {
  return (
    <>
        <label className="purchase-form__label" htmlFor={props.forName} >
            {props.labelName}
          </label>
          <input
            className="purchase-form__input"
            type={props.inputType}
            id={props.inputId}
            accept="image/*"
            name={props.inputName}
            value={props.value}
            ref={props.fileInput}
            onChange={props.onChange}
        />
    </>
  )
}
