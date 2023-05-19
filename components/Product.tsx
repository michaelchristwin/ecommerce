import Image from "next/image";
import { ProductProps } from "./interfaces";
import Link from "next/link";
import { urlFor } from "@/lib/client";

function Product({ product }: any) {
  const { images, slug, name, price } = product;
  console.log(images);
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={urlFor(images[0]).url()}
            height={250}
            width={250}
            alt={`${name}`}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
