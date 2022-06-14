// components
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
