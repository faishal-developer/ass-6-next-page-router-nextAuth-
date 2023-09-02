"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICategory, IHomeProps, Repo } from "@/commonInterfaces/interface";
import { useSession, signIn, signOut } from "next-auth/react";

export const fetchCategory = async (
  setFunc: React.Dispatch<React.SetStateAction<ICategory[]>>
) => {
  const res2 = await fetch("https://ass6-server.vercel.app/categories");
  const data2 = await res2.json();
  setFunc(data2.data);
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchCategory(setCategories);
  }, []);
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-2xl font-bold">তারা দ্যা স্টার</span>
        </Link>

        {/* PC Builder button */}
        <Link href="/pc-builder">
          <span className="lg:inline-block text-white hover:underline ml-6">
            PC Builder
          </span>
        </Link>

        {/* Categories dropdown (responsive) */}
        <div className="z-50 relative">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            Categories
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-lg">
              {categories?.map((cat) => (
                <Link key={cat.id} href={`/categories/${cat.id}`}>
                  <span
                    className={`block px-4 py-2 ${
                      router.pathname === "/categories/cpu" ? "bg-blue-200" : ""
                    }`}
                  >
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Categories dropdown (desktop) */}
        {/* <div className="hidden lg:flex space-x-4">
          {categories?.map((cat)=>(
            <Link key={cat.id} href={`/categories/${cat.id}`}>
             <span className={`text-white ${router.pathname === '/categories/motherboard' ? 'underline' : ''}`}>{cat.name}</span>
          </Link>
          ))}
        </div> */}
        <div className="flex space-x-4">
          {session?.user?.email ? (
            <>
              <span className="text-white">{session.user.email}</span>
              <span
                onClick={() => signOut()}
                className="text-white cursor-pointer"
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <Link href={`/login`}>
                <span className="text-white">Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
