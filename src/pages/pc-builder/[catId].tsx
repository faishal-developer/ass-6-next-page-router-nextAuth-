import type { ReactElement } from "react";
import {
  ICategoriesProps,
  ICategory,
  IHomeProps,
  IProduct,
  Repo,
} from "@/commonInterfaces/interface";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import Layout from "@/Layout/RootLayout";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

function PCBuilderProducts(props: ICategoriesProps) {
  const router = useRouter();
  const id = router.query.catId;
  const { products: p, category } = props;
  const products: IProduct[] = p?.data;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Select one please</h1>
      <Link href={"/pc-builder"}>Go Back</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard category={category} key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

PCBuilderProducts.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<{
  products: IProduct[];
  category: ICategory;
}> = async (context) => {
  const { params } = context;
  const res = await fetch(
    `https://ass6-server.vercel.app/products?category=${params?.catId}`
  );
  const products = await res.json();
  const res2 = await fetch(
    `https://ass6-server.vercel.app/categories/${params?.catId}`
  );
  const category = await res2.json();
  return { props: { products, category } };
};

export default PCBuilderProducts;
