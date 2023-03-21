import LoadingHOC from 'appComponents/LoadingHOC';

import RenderPage from './RenderPage';

const WrapperPage = LoadingHOC(RenderPage);
export default WrapperPage;
export * from './RenderPage';
