import React from "react";
import styles from "./CustomInput.module.css";

const CustomInput = (props) => {
  const {
    name = "",
    customStyle = {},
    label = "",
    placeHolder = "",
    type = "text",
    value = "",
    handleChange = () => {},
    maxLength,
    textArea = false,
  } = props;

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{` ${label} `}</label>}

      {!textArea ? (
        <input
          className={customStyle}
          type={type}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
      ) : (
        <textarea
          placeHolder={placeHolder}
          onChange={handleChange}
          name={name}
          type={type}
          maxLength={maxLength}
          value={value}
          className={styles.textarea}
        />
      )}
    </div>
  );
};

export default CustomInput;
