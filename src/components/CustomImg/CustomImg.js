import React from "react";

const CustomImg = (props) => {
  const { src, alt, CustomImgStyle } = props;
  
  return <img src={src} alt={alt} className={CustomImgStyle} />;
};

export default CustomImg;
