import Image from "next/image";
import { ProductProps } from "./types";
import Link from "next/link";

function Product({ product }: ProductProps) {
  const { images, slug, name, price } = product;
  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className="product-card">
          <Image
            src={`/images${images[0]}`}
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
