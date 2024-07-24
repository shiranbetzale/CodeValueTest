import React from "react";
import CustomImg from "../CustomImg/CustomImg";
import styles from "./Card.module.css";

const Card = (props) => {
  const { onClickDelete, onClickEdit, item } = props;
  const { id, name, description } = item;

  return (
    <button className={styles.container} onClick={onClickEdit}>
      <CustomImg
        src={`/images/product${id}.jpeg`}
        alt={`product${id}`}
        CustomImgStyle={styles.img}
      />
      <div className={styles.textContainer}>
        <h3 className={styles.h2}>{name}</h3>
        <span>{description}</span>
      </div>
      <button onClick={onClickDelete} className={styles.deleteButton}>delete</button>
    </button>
  );
};

export default Card;
