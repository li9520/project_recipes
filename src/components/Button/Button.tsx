import React from 'react';

import cn from 'classnames';

import styles from './Button.module.scss';
import { Loader, LoaderSize } from '../Loader/Loader';

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ onClick, loading, children, className, ...props }) => {
  let { disabled } = props;
  if (loading) {
    disabled = true;
  }
  // если кнопка заблокирована, переданный обработчик не вызывается
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    onClick && onClick(e);
  };

  const btnClass = cn(styles.button, {
    [styles[`${className}`]]: className,
    [styles.button_disabled]: disabled,
  });

  return (
    <button type="button" onClick={handleClick} className={btnClass} disabled={disabled} {...props}>
      {loading && <Loader loading={loading} size={LoaderSize.s} className="loader_white" />}
      {children}
    </button>
  );
};

export default React.memo(Button);
