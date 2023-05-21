import { Product } from "@/components";
import { ProductData } from "@/components/interfaces";
import { useStateContext } from "@/context/StateContext";
import axios from "axios";
import { client, urlFor } from "../../lib/client";
import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { GetStaticPropsContext } from "next";

interface Props {
  allproducts: ProductData[];
  productdata: ProductData;
}

function ProductDetails({ productdata, allproducts }: Props) {
  const { images, name, details, price, slug } = productdata;
  const [index, setIndex] = useState(0);
  const { qty, inc, dec, onAdd } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={`/images${images[index]}`}
              width={350}
              height={350}
              alt="product"
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {images.map((img: string, i: any) => {
              return (
                <Image
                  src={`/images${img}`}
                  width={100}
                  height={100}
                  alt="options"
                  key={i}
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
              <span className="minus" onClick={dec}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={inc}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(productdata, qty)}
            >
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || !params.slug) {
    // Handle the case when the `slug` parameter is not present
    return {
      notFound: true,
    };
  }
  const { slug } = params;
  try {
    const response1 = await axios.get("http://localhost:3000/api/getProducts");
    const response2 = await axios.get(`http://localhost:3000/api/getProduct`, {
      params: { slug: slug },
    });
    const productdata: ProductData = response2.data;
    const allproducts: ProductData[] = response1.data;
    return {
      props: {
        productdata,
        allproducts,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        productdata: {},
        allproducts: [],
        error: "Error fetching product data",
      },
    };
  }
}

export async function getStaticPaths() {
  const response = await axios.get("http://localhost:3000/api/getProducts");
  const allproducts = response.data;
  const paths = allproducts.map((prod: ProductData) => ({
    params: { slug: prod.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}
