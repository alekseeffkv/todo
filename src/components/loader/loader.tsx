import { FC } from 'react';
import './loader.less';

const Loader: FC = () => (
  <div className="loader">
    <div className="loader__body">
      <div className="loader__bounce1" />
      <div className="loader__bounce2" />
    </div>
  </div>
);

export default Loader;
