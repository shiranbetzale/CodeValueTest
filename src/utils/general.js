export const sortByName = (list) => {
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

  export const sortByDate = (list) => {
    return list.sort(
      (a, b) =>
        new Date(...a.createdDate.split("/").reverse()) -
        new Date(...b.createdDate.split("/").reverse())
    );
  };