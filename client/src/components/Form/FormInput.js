import React from 'react'

export default function FormInput(props) {
  return (
    <>
        <label className="purchase-form__label" htmlFor={props.forName}>
            {props.labelName}
          </label>
          <input
            className="purchase-form__input"
            type={props.inputType}
            id={props.inputId}
            name={props.inputName}
            step={props.step}
            value={props.value}
            onChange={props.onChange}
        />
    </>
  )
}
