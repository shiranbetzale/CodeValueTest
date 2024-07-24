import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Products from "../../components/Products/Products";
import Form from "../../components/Form/Form";
import styles from "./MyStore.module.css";
import moment from "moment";

const MyStore = () => {
  const [productsList, setProductsList] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState();

  //add new item
  const onAdd = (formData) => {
    const id = productsList.length + 1;

    const newProduct = {
      id,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      createdDatelet: moment(new Date()).format("DD/MM/YYYY"),
    };

    const productsListCopy = [...productsList, newProduct];
    setProductsList(productsListCopy);
  };

  //edit item
  const onEdit = (formData) => {
    const productsListCopy = [...productsList];
    productsList[selectedProduct.id - 1].name = formData.name;
    productsList[selectedProduct.id - 1].description = formData.description;
    productsList[selectedProduct.id - 1].price = formData.price;

    setProductsList(productsListCopy);
  };

  //delete item
  const onClickDelete = (e, id) => {
    e.stopPropagation();
    setShowForm(false);

    const productsListCopy = [...productsList].filter(
      (product) => product.id !== id
    );
    setProductsList(productsListCopy);
  };

  const onClickEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setMode("edit");
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
    setMode("add");
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
            onClickDelete={onClickDelete}
          />
        </div>
        <div className={styles.container}>
          {showForm && (
            <>
              <h2>{selectedProduct?.name}</h2>
              <Form
                item={selectedProduct}
                mode={mode}
                onAdd={onAdd}
                onEdit={onEdit}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStore;
