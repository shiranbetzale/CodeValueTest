import { useState, useEffect } from "react";
import Card from "./../Card/Card";
import Menu from "./../Menu/Menu";

const Products = (props) => {
  const {
    setSelectedSort,
    onClickDelete,
    productsList,
    onClickEdit,
    onClickAdd,
    sortByName,
    sortByDate,
  } = props;
  const [productsListAfterSearch, setProductsListAfterSearch] = useState();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    if (!productsList) return;
    setProductsListAfterSearch(productsList);
  }, [productsList]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
    const copy = [...productsList];
    const filter = copy.filter(
      (item) =>
        item?.name?.includes(e.target.value) ||
        item?.description?.includes(e.target.value)
    );
    setProductsListAfterSearch(filter);
  };

  const onSelectChanged = (e) => {
    let afterSort;
    setSelectedSort(e.target.value);
    if (e.target.value === "name") {
      //sort by name
      afterSort = sortByName(productsListAfterSearch);
    } else {
      //sort by date
      afterSort = sortByDate(productsListAfterSearch);
    }

    setProductsListAfterSearch((prev) => [...prev], afterSort);
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
            onClickDelete={(e) => onClickDelete(e, product.id)}
          />
        ))
      ) : (
        <div>טוען רשימת מוצרים...</div>
      )}
    </div>
  );
};

export default Products;
