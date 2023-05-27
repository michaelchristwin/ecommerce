import { Product, FooterBanner, HeroBanner, Footer } from "@/components";
import axios from "axios";
import { BannerData, HomeProps, ProductData } from "../components/interfaces";

function Home({ productdata, bannerdata }: HomeProps) {
  return (
    <>
      <HeroBanner heroBanner={bannerdata[0]} />
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

// export async function getServerSideProps() {
//   try {
//     const response1 = await axios.get<ProductData>(
//       "http://ecommerce-five-flame.vercel.app/api/getProducts"
//     );
//     const response2 = await axios.get<BannerData>(
//       "http://ecommerce-five-flame.vercel.app/api/getBanners"
//     );
//     const productdata = response1.data;
//     const bannerdata = response2.data;
//     return {
//       props: {
//         productdata,
//         bannerdata,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         productdata: {},
//         allproducts: {},
//       },
//     };
//   }
// }
