import { Product, FooterBanner, HeroBanner, Footer } from "@/components";
import axios from "axios";
import { HomeProps } from "../components/interfaces";
import { client } from "../lib/client";

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
  const query = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';
  const productdata = await client.fetch(query);
  const bannerdata = await client.fetch(bannerQuery);
  return {
    props: {
      productdata,
      bannerdata,
    },
  };
}
