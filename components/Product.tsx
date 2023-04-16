import Image from "next/image";
import { ProductProps } from "./interfaces";
import Link from "next/link";

function Product({ product }: ProductProps) {
  const { images, slug, name, price } = product;
  console.log(images[0]);
  // console.log(imageUrls);
  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className="product-card">
          <Image
            src={images[0]}
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
