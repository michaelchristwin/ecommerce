import { Product, FooterBanner, HeroBanner, Footer } from "@/components";
import axios from "axios";
import { ProductData, HomeProps, BannerData } from "../components/interfaces";

function Home({ productdata, bannerdata }: HomeProps) {
  return (
    <>
      <HeroBanner heroBanner={bannerdata.length ? bannerdata[0] : undefined} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {productdata.map((product) => {
          return <Product key={product.name} product={product} />;
        })}
      </div>
      <FooterBanner footerBanner={bannerdata[0]} />
    </>
  );
}
export default Home;

export async function getServerSideProps() {
  const response = axios.get<ProductData[]>(
    "http://localhost:5050/api/products/",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  const response2 = axios.get<BannerData[]>(
    "http://localhost:5050/api/banners/",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  const productdata = (await response).data;
  const bannerdata = (await response2).data;
  return {
    props: {
      productdata,
      bannerdata,
    },
  };
}
