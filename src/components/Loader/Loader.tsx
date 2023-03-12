import React from 'react';

import cn from 'classnames';

import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({ size = LoaderSize.m, loading = true, className = '' }: LoaderProps) => {
  if (!loading) {
    return null;
  }

  const loaderClass = cn(styles.loader, `${styles[`loader_${size}`]}`, {
    [styles[`${className}`]]: className,
  });

  return <div className={loaderClass}> </div>;
};
