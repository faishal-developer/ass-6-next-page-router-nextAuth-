import type { ReactElement } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import {
  ICategoriesProps,
  ICategory,
  IProduct,
} from "@/commonInterfaces/interface";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard";
import Layout from "@/Layout/RootLayout";

function CategoryBasedProduct(props: ICategoriesProps) {
  const router = useRouter();
  const id = router.query.catId;
  const { products: p, category } = props;
  const products: IProduct[] = p?.data;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">{category?.data?.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

CategoryBasedProduct.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://ass6-server.vercel.app/categories");
  const categories = await res.json();
  const paths = categories.data.map((p: ICategory) => ({
    params: { catId: p.id.toString() },
  }));
  return {
    paths,
    fallback: true, // false or "blocking"
  };
};
export const getStaticProps: GetStaticProps<{
  products: IProduct[];
}> = async (context) => {
  const { params } = context;
  const res = await fetch(
    `https://ass6-server.vercel.app/products?category=${params?.catId}`
  );
  const products = await res.json();
  const res2 = await fetch(
    `https://ass6-server.vercel.app/categories/${products?.data[0]?.Category}`
  );
  const category = await res2.json();
  return { props: { products, category } };
};

export default CategoryBasedProduct;
