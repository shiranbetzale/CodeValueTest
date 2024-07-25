import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Products from "../../components/Products/Products";
import Form from "../../components/Form/Form";
import styles from "./MyStore.module.css";
import moment from "moment";
import { sortByName, sortByDate } from "../../utils/general";

const MyStore = () => {
  const [productsList, setProductsList] = useState(); //orginal list
  const [selectedProduct, setSelectedProduct] = useState();
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState();
  const [selectedSort, setSelectedSort] = useState("name");
  const [newList, setNewList] = useState();

  //add new item
  const onAdd = (formData) => {
    let id = Math.max(...newList.map((o) => o.id)) + 1;
    const newProduct = {
      id,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      createdDate: moment(new Date()).format("DD/MM/YYYY"),
    };

    const productsListCopy = [...newList, newProduct];

    if (selectedSort === "name") {
      setNewList(sortByName(productsListCopy));
      setProductsList(sortByName(productsListCopy));
    } else {
      setProductsList(sortByDate(productsListCopy));
      setNewList(sortByDate(productsListCopy));
    }
    setShowForm(false);
  };

  //edit item
  const onEdit = (formData) => {
    const productsListCopy = [...newList];
    const findIndex = productsListCopy.findIndex(
      (x) => x.id === selectedProduct.id
    );
    productsListCopy[findIndex].name = formData.name;
    productsListCopy[findIndex].description = formData.description;
    productsListCopy[findIndex].price = formData.price;

    if (selectedSort === "name") {
      setNewList(sortByName(productsListCopy));
      setProductsList(sortByName(productsListCopy));
    } else {
      setNewList(sortByDate(productsListCopy));
      setProductsList(sortByDate(productsListCopy));
    }
    setShowForm(false);
  };

  //delete item
  const onClickDelete = (e, id) => {
    e.stopPropagation();
    setShowForm(false);

    const productsListCopy = [...newList].filter(
      (product) => product.id !== id
    );
    setNewList(productsListCopy);
    setProductsList(productsListCopy);
  };

  const onClickEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setMode("edit");
  };

  useEffect(() => {
    axios
      .get("/data/products.json")
      .then((res) => {
        console.log(res.data);
        setProductsList(sortByName(res.data.products));
        setNewList(sortByName(res.data.products));
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
            setSelectedSort={setSelectedSort}
            productsList={productsList}
            onClickEdit={onClickEdit}
            onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}
            newList={newList}
            setNewList={setNewList}
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
