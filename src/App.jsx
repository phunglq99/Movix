import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getApiConfiguration } from './store/homeSlice';
import Home from './pages/home/Home';
import Detail from './pages/details/Detail';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Explore from './pages/explore/Explore';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { fetchDataFromApi } from './utils/api';

function App() {

  const dispatch = useDispatch();
  const { url } = useSelector(state => state.home);

  useEffect(() => {
    fetchApiConfig();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url))
      })
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Detail />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
