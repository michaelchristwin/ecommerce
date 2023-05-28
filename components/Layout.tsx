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
        <title>SoundKit Mart</title>
        <meta
          name="description"
          content="SoundKit Mart is a demo ecommerce webapp developed by Michael Christwin."
        />
        <meta name="robots" content="index, follow" />
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
