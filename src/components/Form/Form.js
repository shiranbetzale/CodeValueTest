import { useState, useEffect } from "react";
import CustomInput from "./../CustomInput/CustomInput";
import CustomImg from "./../CustomImg/CustomImg";
import styles from "./Form.module.css";

const Form = (props) => {
  const { item, mode, onAdd, onEdit } = props;

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (!item) return;
    setErrors({
      name: "",
      description: "",
      price: "",
    });
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
    });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      if (mode === "add") {
        onAdd(formData);
      } else {
        onEdit(formData);
      }
      console.log("Form is success!");
    } else {
      console.log(`Form has validation errors.`);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    //name
    if (!data.name.trim()) {
      errors.name = "name is required";
    }

    //price
    if (!data.price) {
      errors.price = "price is required";
    } else if (data.price < 0) {
      errors.price = `price must be big from 0`;
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        {item?.id && (
          <CustomImg
            src={`/images/product${item.id}.jpeg`}
            alt={`product${item.id}`}
            CustomImgStyle={styles.img}
          />
        )}
      </div>

      <div>
        <CustomInput
          name="name"
          label="name"
          placeHolder="name"
          type="text"
          value={formData.name}
          handleChange={handleChange}
          maxLength={30}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <CustomInput
        textArea={true}
        placeHolder="description"
        label="description"
        name="description"
        maxLength={200}
        value={formData.description}
        handleChange={handleChange}
      />

      <div>
        <CustomInput
          name="price"
          label="price"
          placeHolder="price"
          type="number"
          value={formData.price}
          handleChange={handleChange}
        />
        {errors.price && <span className={styles.error}>{errors.price}</span>}
      </div>

      <div className={styles.submit}>
        <input type="submit" />
      </div>
    </form>
  );
};

export default Form;
