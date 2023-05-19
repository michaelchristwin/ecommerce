import Image from "next/image";
import Link from "next/link";
import { BannerData } from "./interfaces";
import { urlFor } from "@/lib/client";

interface HeroBannerProps {
  heroBanner?: BannerData;
}

function HeroBanner({ heroBanner }: HeroBannerProps) {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner?.smallText}</p>
        <h3>{heroBanner?.midText}</h3>
        <h1>{heroBanner?.largeText}</h1>
        <Image
          src={urlFor(heroBanner?.image).url()}
          height={300}
          width={300}
          alt="Banner Image"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner?.product}`}>
            <button type="button">{heroBanner?.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
