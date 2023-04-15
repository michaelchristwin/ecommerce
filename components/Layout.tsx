import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ParentComponentProps {
  children: React.ReactNode;
}

function Layout({ children }: ParentComponentProps) {
  return (
    <div className="layout">
      <Head>
        <title>Mikey Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
