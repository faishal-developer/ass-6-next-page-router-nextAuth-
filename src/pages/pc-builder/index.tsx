"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/Layout/RootLayout";
import { ICategory } from "@/commonInterfaces/interface";
import PcBuilderClientComponent from "@/components/PcBuilderClientComponent";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { removeComponent, resetState } from "@/store/pcBuilder";
import { useRouter } from "next/router";

interface Iprops {
  categories: { data: ICategory[] };
}

type ICatName =
  | "CPU / Processor"
  | "Motherboard"
  | "RAM"
  | "Power Supply Unit"
  | "Storage Device"
  | "Monitor";

export const fetchCategory = async (
  setFunc: React.Dispatch<React.SetStateAction<ICategory[]>>
) => {
  const res = await fetch("https://ass6-server.vercel.app/categories");
  const categories = await res.json();
  setFunc(categories.data);
};

const isOkay = (data: any) => {
  let isTrue = true;
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      isTrue = false;
    }
  });
  return isTrue;
};

const PCBuilder = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { pc } = useAppSelector((state) => state.pcBuilder);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCategory(setCategories);
  }, []);
  console.log(isOkay(pc));

  const buildPc = () => {
    alert("Pc build done successfully");
    router.push("/");
    dispatch(resetState());
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">PC Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <div key={category.id} className="border p-4">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            {pc[category.name as ICatName] ? (
              <>
                {pc[category.name as ICatName]?.ProductName}
                <span
                  className="btn btn-xs red-500"
                  onClick={() => dispatch(removeComponent(category.name))}
                >
                  delete
                </span>
              </>
            ) : (
              <Link href={`/pc-builder/${category.id}`}>
                <span className="bg-blue-500 text-white rounded p-2 mt-2 block text-center">
                  Choose {category.name}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>

      <span
        onClick={() => buildPc()}
        className={
          !isOkay(pc)
            ? "hidden"
            : "bg-blue-500 text-white rounded p-2 mt-2 block text-center"
        }
      >
        Build Your Pc
      </span>
    </div>
  );
};

PCBuilder.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PCBuilder;
