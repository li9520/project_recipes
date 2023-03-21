import React from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import DropDownStore from 'store/DropDownStore';
import { useLocalStore } from 'utils/useLocalStote';

import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: string[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: string[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  pluralizeOptions: (values: string[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, value, onChange, pluralizeOptions, ...props }) => {
  const dropDownClass = cn(styles.dropdown_header, {
    [styles.dropdown_disabled]: props.disabled,
  });

  const isChecked = (options: Option) => {
    return value.includes(options.key);
  };

  const handleClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    const currentClicked = e.target.id;
    const activeValues = e.target.checked
      ? [...value, currentClicked]
      : value.filter((item) => currentClicked !== item);
    onChange && onChange(activeValues);
  };

  const renderList = () => {
    return (
      <ul className={styles.dropdown_body}>
        {options.map(({ key, value }) => (
          <li key={key}>
            <input onChange={handleClick} id={key} name={key} type="checkbox" checked={isChecked({ key, value })} />
            <label className={styles.dropdown_item} htmlFor={key}>
              {value}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  const dropDownStore = useLocalStore(() => new DropDownStore());
  const toggleDropdown = () => {
    dropDownStore.toggleIsOpen();
  };

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const handleClickOnPage = (e: Event) => {
      if (containerRef.current && !containerRef.current.contains(e.target as HTMLElement)) {
        dropDownStore.close();
      }
    };
    // подписываемся на событие
    document.addEventListener('click', handleClickOnPage);

    // отписываемся от события
    return () => document.removeEventListener('click', handleClickOnPage);
  }, [dropDownStore]);

  const containerRef = React.useRef<null | HTMLDivElement>(null);
  return (
    <div className={styles.dropDown} ref={containerRef}>
      <div className={dropDownClass} {...props} onClick={toggleDropdown}>
        {pluralizeOptions(value)}
      </div>
      {dropDownStore.isOpen && !props.disabled && renderList()}
    </div>
  );
};

export default observer(MultiDropdown);
