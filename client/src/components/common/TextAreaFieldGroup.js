import React from "react";
import PropTypes from "prop-types";
import styles from "../auth/Auth.module.css";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  // info,
  onChange
}) => {
  return (
    <div className={styles.input__space}>
      <textarea
        className={error ? styles.input__warning : styles.input}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className={styles.input__error}>* {error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
