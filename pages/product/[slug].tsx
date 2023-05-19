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

interface Props {
  allproducts: ProductData[];
  productdata: ProductData[];
}

function ProductDetails({ productdata, allproducts }: Props) {
  const { images, name, details, price, slug } = productdata[0];
  const [index, setIndex] = useState(0);
  const { qty, inc, dec, onAdd } = useStateContext();
  console.log(productdata);
  // console.log(allproducts);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={urlFor(images[index]).url()}
              width={350}
              height={350}
              alt={`product`}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {images.map((img: any, i: any) => {
              return (
                <Image
                  src={urlFor(img).url()}
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

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const productquery = `*[_type == "product" && slug.current == '${params.slug}']`;
    const query = `*[_type == "product"]`;

    const allproducts = await client.fetch(query);
    const productdata = await client.fetch(productquery);
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
  const productquery = `*[_type == "product"]`;

  const allproducts = await client.fetch(productquery);
  const paths = allproducts.map((prod: ProductData) => ({
    params: { slug: prod.slug.current },
  }));
  return {
    paths,
    fallback: true,
  };
}
