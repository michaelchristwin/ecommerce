export type ProductData = {
  name: string;
  images: string[];
  price: number;
  details: string;
  slug: string;
};
export type Image = {
  image: string;
};
export type HomeProps = {
  productdata: ProductData[];
  bannerdata: BannerData[];
};
export type BannerData = {
  image: string;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText: string;
  largeText2: string;
  discount: string;
  saleTime: string;
};
export type ProductProps = {
  product: ProductData;
};
