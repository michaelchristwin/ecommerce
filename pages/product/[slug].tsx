import { Product } from "@/components";
import { ProductData } from "@/components/interfaces";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
interface Props {
  allproducts: ProductData[];
  productdata: ProductData;
}

function ProductDetails({ productdata, allproducts }: Props) {
  const { images, name, details, price, slug } = productdata;
  const [index, setIndex] = useState(0);
  // console.log(images);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={images[index]}
              width={350}
              height={350}
              alt={`product`}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {images.map((image, i) => {
              return (
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt="options"
                  key={image}
                  onMouseEnter={() => setIndex(i)}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                />
              );
            })}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div className="flex">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc flex">
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart">
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {allproducts.map((product) => {
              return <Product product={product} key={product.name} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const response = await axios.get<ProductData>(
    `http://127.0.0.1:8000/api/products/${params.slug}/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  const response2 = await axios.get<ProductData[]>(
    `http://127.0.0.1:8000/api/products/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  const allproducts = response2.data;
  const productdata = response.data;
  return {
    props: {
      productdata,
      allproducts,
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
    fallback: "blocking",
  };
}
