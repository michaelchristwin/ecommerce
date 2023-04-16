export interface ProductData {
  name: string;
  image: string;
  price: number;
  details: string;
  slug: string;
}
export interface HomeProps {
  productdata: ProductData[];
  bannerdata: BannerData[];
}
export interface BannerData {
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
}
export interface ProductProps {
  product: ProductData;
}
