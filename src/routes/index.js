import { lazy } from "react";

const Home = lazy(() => import('../pages/home/Home'));
const Detail = lazy(() => import('../pages/details/Detail'));
const SearchResult = lazy(() => import('../pages/searchResult/SearchResult'));
const Explore = lazy(() => import('../pages/explore/Explore'));
const PageNotFound = lazy(() => import('../pages/pageNotFound/PageNotFound'));

const publicRoute = [
    { path: '/', component: Home },
    { path: '/:mediaType/:id', component: Detail },
    { path: '/search/:query', component: SearchResult },
    { path: '/explore/:mediaType', component: Explore },
    { path: '*', component: PageNotFound },
];

const privateRoute = [

];

export { publicRoute, privateRoute }