import React from 'react';

import MultiDropdown, { Option } from 'components/MultiDropdown';

import styles from './Filter.module.scss';

const Filter = ({
  filter,
  setType,
  setDiet,
}: {
  filter: { type: string[]; diet: string[] };
  setType: (options: string[]) => void;
  setDiet: (options: string[]) => void;
}) => {
  const types: Option[] = [
    { key: 'main course', value: 'main course' },
    { key: 'side dish', value: 'side dish' },
    { key: 'appetizer', value: 'appetizer' },
    { key: 'dessert', value: 'dessert' },
    { key: 'salad', value: 'salad' },
    { key: 'bread', value: 'bread' },
    { key: 'breakfast', value: 'breakfast' },
    { key: 'soup', value: 'soup' },
    { key: 'beverage', value: 'beverage' },
    { key: 'sauce', value: 'sauce' },
    { key: 'marinade', value: 'marinade' },
    { key: 'fingerfood', value: 'fingerfood' },
    { key: 'snack', value: 'snack' },
    { key: 'drink', value: 'drink' },
  ];

  const diest: Option[] = [
    { key: 'Gluten Free', value: 'Gluten Free' },
    { key: 'Ketogenic', value: 'Ketogenic' },
    { key: 'Vegetarian', value: 'Vegetarian' },
    { key: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian' },
    { key: 'Vegan', value: 'Vegann' },
    { key: 'Pescetarian', value: 'Pescetarian' },
    { key: 'Paleo', value: 'Paleo' },
    { key: 'Primal', value: 'Primal' },
    { key: 'Low FODMAP', value: 'Low FODMAP' },
    { key: 'Whole30', value: 'Whole30' },
  ];

  return (
    <div className={styles.filter}>
      <div className={styles.filter_item}>
        <MultiDropdown options={types} value={filter.type} onChange={setType} pluralizeOptions={() => 'All courses'} />
      </div>
      <div className={styles.filter_item}>
        <MultiDropdown options={diest} value={filter.diet} onChange={setDiet} pluralizeOptions={() => 'All diets'} />
      </div>
    </div>
  );
};

export default Filter;
