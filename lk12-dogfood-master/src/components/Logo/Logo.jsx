import React from "react";
import style from "./style.css";
import logoImg from './img/logo.svg';
import { Link } from "react-router-dom";

export const Logo = ({ className }) => {
  return (
    <Link to="/" className={className ? className : "logo"}>
      <img src={logoImg} alt="logo" className={style.logo} />
    </Link>
  );
};