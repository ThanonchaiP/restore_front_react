import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import About from "./pages/about/About";
import Catalog from "./pages/catalog/Catalog";
import ProductDetail from "./pages/catalog/ProductDetail";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import ServerError from "./pages/error/ServerError";
import NotFound from "./pages/error/NotFound";
import BasketPage from "./pages/basket/Basket";
import { getCookie } from "./utils/util";
import httpClient from "./utils/httpClient";
import Loading from "./components/loading/Loading";
import Checkout from "./pages/checkout/Checkout";
import { useAppDispatch } from "./store/configureStore";
import { setBasket } from "./slice/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      httpClient.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  if (loading) return <Loading message="Initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog">
            <Route path="" element={<Catalog />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
