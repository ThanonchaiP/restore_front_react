import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import reportWebVitals from "./reportWebVitals";
import CustomBrowserRouter from "./utils/CustomBrowserRouter";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <CustomBrowserRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </CustomBrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
