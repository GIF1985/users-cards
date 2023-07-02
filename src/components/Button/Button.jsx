import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, text }) => {
  const [color, setColor] = useState("blue");
  const [buttonText, setButtonText] = useState(text);

  const handleClick = () => {
    setColor((prevColor) => (prevColor === "blue" ? "gray" : "blue"));
    setButtonText(buttonText === text ? "Following" : text);
    onClick();
  };

  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
