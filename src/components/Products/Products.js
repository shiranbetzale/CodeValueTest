import { useState, useEffect } from "react";
import Card from "./../Card/Card";
import Menu from "./../Menu/Menu";

const Products = (props) => {
  const { productsList, onClickEdit,onClickAdd } = props;
  const [productsListAfterSearch, setProductsListAfterSearch] = useState();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    if (!productsList) return;
    setProductsListAfterSearch(productsList);
  }, [productsList]);

  const onClickDelete = (e) => {
    e.stopPropagation();
    alert("onClickDelete");
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
    const filter = productsList.filter(
      (item) =>
        item?.name?.includes(e.target.value) || item?.description?.includes(e.target.value)
    );
    setProductsListAfterSearch(filter);
  };

  const onSelectChanged = () => {
    alert("onSelectChanged");
  };

  return (
    <div>
      <Menu
        onClickAdd={onClickAdd}
        onSearch={onSearch}
        onSelectChanged={onSelectChanged}
        searchValue={searchValue}
      />
      {productsListAfterSearch ? (
        productsListAfterSearch.map((product) => (
          <Card
            key={`product${product.id}`}
            item={product}
            onClickEdit={() => onClickEdit(product)}
            onClickDelete={onClickDelete}
          />
        ))
      ) : (
        <div>טוען רשימת מוצרים...</div>
      )}
    </div>
  );
};

export default Products;
