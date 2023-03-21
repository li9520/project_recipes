import React from 'react';

import AddButton from 'components/AddButton';
import { AiFillDelete } from 'react-icons/ai';
import favouriteStore from 'store/FavouriteStore/instance';

import styles from './Card.module.scss';

export type CardProps = {
  id: number;
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick: React.MouseEventHandler;
  addButton?: boolean;
  deletebutton?: boolean;
};

const CardImage = ({ image, title }: { image: string; title: string }) => {
  return <img className={styles.card_img} src={image} alt={title} />;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { id, image, title, subtitle, content, onClick, addButton, deletebutton } = props;
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick && onClick(e);
  };
  const titleDom = <div className={styles.card_title}>{title}</div>;
  const subtitleDom = <div className={styles.card_subtitle}>{subtitle}</div>;
  const contentDom = <div className={styles.card_content}>{content}</div>;

  const handleAddClick: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    favouriteStore.addRecipe({ id, image, title, onClick });
  };

  const handleDeleteClick: React.MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    favouriteStore.removeRecipe(id);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.card_body}>
        <CardImage image={image} title={title as string} />
        {titleDom}
        {subtitle && subtitleDom}
      </div>
      <div className={styles.content}>
        {content ? contentDom : <div />}
        {addButton && <AddButton onClick={handleAddClick} />}
        {deletebutton && (
          <AiFillDelete className={styles.delete} title="delete from favorites" onClick={handleDeleteClick} />
        )}
      </div>
    </div>
  );
};

export default Card;
