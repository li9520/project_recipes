import React from 'react';

import cn from 'classnames';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ onChange, ...props }) => {
  const inputClass = cn(styles.input, {
    [styles.input_disabled]: props.disabled,
  });

  const handleClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.disabled) return;
    onChange && onChange(e.target.value);
  };
  return <input type="text" onChange={handleClick} className={inputClass} {...props} />;
};

export default Input;
