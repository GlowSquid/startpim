// import App, { Container } from "next/app";
// import React from "react";
// import withReduxStore from "../lib/with-redux-store";
// import { Provider } from "react-redux";

// import { fetchAuthenticated } from "../actions/account";
// import Root from "../components/Root";

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, reduxStore } = this.props;
//     reduxStore.dispatch(fetchAuthenticated());
//     // .then(() => {

//     // })
//     return (
//       <Container>
//         <Provider store={reduxStore}>
//           <Component {...pageProps} />
//           {/* <Route exact path='/' component={Root} /> */}
//           {/* <Root /> */}
//         </Provider>
//       </Container>
//     );
//   }
// }

// export default withReduxStore(MyApp);

import { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";

import { fetchAuthenticated } from "../actions/account";
// import Root from "../components/Root";

// const MyApp = (App) => {
function MyApp({ Component, pageProps, reduxStore }) {
  reduxStore.dispatch(fetchAuthenticated());

  return (
    <Container>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
        {/* <Route exact path='/' component={Root} /> */}
        {/* <Root /> */}
      </Provider>
    </Container>
  );
}

export default withReduxStore(MyApp);
