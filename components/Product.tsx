import Image from "next/image";
import { ProductData } from "./interfaces";
import Link from "next/link";

interface ProductProps {
  product: ProductData;
}

function Product({ product: { name, slug, price, image } }: ProductProps) {
  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className="product-card">
          <Image
            src={`${image}`}
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
