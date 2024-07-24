import React from "react";
import styles from "./Menu.module.css";
import CustomInput from "./../CustomInput/CustomInput";

const Menu = (props) => {
  const { onClickAdd, onSearch, onSelectChanged, searchValue } = props;

  return (
    <div className={styles.container}>
      <button onClick={onClickAdd} className={styles.addButton}>
        add new product
      </button>
      <CustomInput
        name="search"
        customStyle={styles.search}
        placeHolder="search"
        type="text"
        value={searchValue}
        handleChange={onSearch}
      />
      <label>
        {"sortBy: "}
        <select onChange={onSelectChanged}>
          <option selected value="name">
            name
          </option>
          <option value="recently_added">recently added</option>
        </select>
      </label>
    </div>
  );
};

export default Menu;
