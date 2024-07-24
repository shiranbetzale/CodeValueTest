import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Products from "../../components/Products/Products";
import Form from "../../components/Form/Form";
import styles from "./MyStore.module.css";

const MyStore = () => {
  const [productsList, setProductsList] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [showForm, setShowForm] = useState(false);

  const onClickEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const sortByName = (list) => {
    return list.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  };

  useEffect(() => {
    axios
      .get("/data/products.json")
      .then((res) => {
        console.log(res.data);
        setProductsList(sortByName(res.data.products));
      })
      .catch((err) => console.log(err));
  }, []);

  const onClickAdd = () => {
    setShowForm(true);
    setSelectedProduct({
      name: "",
      description: "",
      price: "",
    });
  };

  return (
    <div>
      <h1 className={styles.h1}>My Store</h1>
      <div className={styles.myAppContainer}>
        <div className={styles.container}>
          <Products
            productsList={productsList}
            onClickEdit={onClickEdit}
            onClickAdd={onClickAdd}
            sortByName={sortByName}
          />
        </div>
        <div className={styles.container}>
          {showForm && (
            <>
              <h2>{selectedProduct?.name}</h2>
              <Form item={selectedProduct} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStore;
