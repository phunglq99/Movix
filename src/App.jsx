import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { fetchDataFromApi } from './utils/api';
import { Suspense } from 'react';
import { publicRoute } from './routes';

function App() {

  const dispatch = useDispatch();
  const { url } = useSelector(state => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
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

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    dispatch(getGenres(allGenres))
  }

  return (
    <Router>
      <Suspense fallback={<div>Loading....</div>}>
        <Header />
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page />} />
            )
          })}
          {/* <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Detail />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
