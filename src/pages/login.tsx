// pages/login.tsx
import Layout from "@/Layout/RootLayout";
import { signIn } from "next-auth/react";
import Link from "next/link";
import type { ReactElement } from 'react'


export default function Login() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">GitHub Authentication</h1> 
            <button
                onClick={()=>signIn("github",{
                  callbackUrl:"http://localhost:3000/"
                })} 
                
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign in with GitHub
            </button>
            <p className="text-gray-500 mt-4">or</p>
            <Link href="/">
              <span className="text-blue-500 hover:underline mt-2">Go back to Home</span>
            </Link>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
