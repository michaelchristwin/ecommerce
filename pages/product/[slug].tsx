import { ProductData } from "@/components/interfaces";
import axios from "axios";
import Image from "next/image";

function ProductDetails({ productdata }: { productdata: ProductData }) {
  const { image, name, details, price, slug } = productdata;
  console.log(image);
  return (
    <div>
      <div className="product-detail-container">
        <div className="image-container">
          <Image src={image} width={300} height={300} alt={`product`} />
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const response = await axios.get<ProductData>(
    `http://127.0.0.1:8000/api/products/${params.slug}/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  const productdata = JSON.parse(JSON.stringify(response.data));
  return {
    props: {
      productdata,
    },
  };
}

export async function getStaticPaths() {
  const response = await axios.get<ProductData[]>(
    `http://127.0.0.1:8000/api/products/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  const allproducts = response.data;
  const paths = allproducts.map((prod) => ({ params: { slug: prod.slug } }));
  return {
    paths,
    fallback: false,
  };
}
