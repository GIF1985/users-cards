import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.avatar} />;
};

export default Avatar;
