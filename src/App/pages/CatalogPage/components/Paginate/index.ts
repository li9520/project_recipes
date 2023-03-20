import LoadingHOC from 'appComponents/LoadingHOC';

import Paginate from './Paginate';

const WrapperPage = LoadingHOC(Paginate);
export default WrapperPage;
export * from './Paginate';
