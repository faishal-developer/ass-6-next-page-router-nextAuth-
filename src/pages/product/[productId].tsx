import Layout from "@/Layout/RootLayout";
import {
  IProduct,
  IProductDetailsProps,
  IStaticPath,
} from "@/commonInterfaces/interface";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";

const ProductDetails = (props: IProductDetailsProps) => {
  const { product } = props;
  if (!product) {
    return <h2>Loading.......</h2>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src={product?.Image}
            alt={product?.ProductName}
            className="w-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product?.ProductName}</h1>
          <p className="text-gray-500 mb-2">{product?.Category}</p>
          <p
            className={`text-${
              product?.Status === "In Stock" ? "green" : "red"
            }-500 mb-2`}
          >
            {product?.Status}
          </p>
          <p className="text-2xl font-bold mb-2">{product?.Price}</p>
          <p className="text-gray-700">{product?.Description}</p>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            {/* <ul className="list-disc list-inside">
              {product?.KeyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
              </ul> */}
          </div>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Ratings and Reviews</h2>
            <p className="text-lg">
              Individual Rating: {product?.Rating} Stars
            </p>
            {/* <p className="text-lg">Average Rating: {product?.averageRating} Stars</p> */}
            <div className="mt-4">
              {product?.Reviews.map((review, index) => (
                <div key={index} className="border p-3 mb-2">
                  <p>{review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://ass6-server.vercel.app/products");
  const products = await res.json();
  const paths = products.data.slice(0, 3).map((p: IProduct) => ({
    params: { productId: p.id.toString() },
  }));
  return {
    paths,
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  product: IProduct;
}> = async (context) => {
  const { params } = context;
  const res = await fetch(
    `https://ass6-server.vercel.app/products/${params?.productId}`
  );
  const product = await res.json();
  return { props: { product } };
};
 
export default ProductDetails;
