import { Container } from "next/app";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";

import { fetchAuthenticated } from "../actions/account";
// import Index from "./index";

function MyApp({ Component, pageProps, reduxStore }) {
  reduxStore.dispatch(fetchAuthenticated());

  return (
    <Container>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
        {/* <Index /> */}
      </Provider>
    </Container>
  );
}

export default withReduxStore(MyApp);
