import React from 'react';

import { Loader, LoaderSize } from 'components/Loader';

import styles from './LoadingHoc.module.scss';

interface WithLoadingProps {
  loading: boolean;
}
const LoadingHOC = <P extends object>(Component: React.FC<P>) => {
  const WrappedComponent: React.FC<P & WithLoadingProps> = (prop) => {
    const { loading, ...props } = prop;
    return loading ? (
      <div className={styles.center}>
        <Loader size={LoaderSize.l} />
      </div>
    ) : (
      <Component {...(props as P)} />
    );
  };
  return WrappedComponent;
};

export default LoadingHOC;
