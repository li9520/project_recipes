import React from 'react';

export interface ILocalStore {
  destroy(): void;
}
export const useLocalStore = <T extends ILocalStore>(creater: () => T): T => {
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creater();
  }

  React.useEffect(() => {
    return () => container.current?.destroy();
  }, []);
  return container.current;
};
