import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Style.css";

const Layout = props => (
  <div className="container">
    <Head />
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
