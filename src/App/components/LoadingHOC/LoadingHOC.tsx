import React from 'react';

import { Loader, LoaderSize } from 'components/Loader';

const LoadingHOC = (Component: React.FC<any>, propName: string) => {
  const WrappedComponent = (prop: any) => {
    return prop[propName] ? <Loader size={LoaderSize.l} /> : <Component {...prop} />;
  };
  return WrappedComponent;
};

export default LoadingHOC;
