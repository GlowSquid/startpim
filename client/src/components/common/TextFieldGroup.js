import React from "react";
import PropTypes from "prop-types";
import styles from "../auth/Auth.module.css";

function TextFieldGroup({
  name,
  placeholder,
  value,
  // label,
  error,
  info,
  type,
  onChange,
  disabled
  // classname
}) {
  return (
    <div className={styles.input__space}>
      <input
        className={error ? styles.input__warning : styles.input}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className={styles.input__error}>* {error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;