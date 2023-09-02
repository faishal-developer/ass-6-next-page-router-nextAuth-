import type { ReactElement } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Layout from "@/Layout/RootLayout";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { IHomeProps, Repo } from "@/commonInterfaces/interface";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

function Home(props: IHomeProps) {
  const { products: p, categories: c } = props;
  const products = p?.data;
  const categories = c?.data;
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category, index) => (
            <Link
              href={`categories/${category.id}`}
              key={index}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              // You can add an onClick handler here to filter products by category
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<{
  products: Repo;
}> = async () => {
  const res = await fetch("https://ass6-server.vercel.app/products");
  const data = await res.json();
  const res2 = await fetch("https://ass6-server.vercel.app/categories");
  const data2 = await res2.json();
  return { props: { products: data, categories: data2 } };
};

export default Home;
