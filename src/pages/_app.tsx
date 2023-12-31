import '@/styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },  
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
 
  return(
    <Provider store={store}>
      <SessionProvider session={session}>
       { getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </Provider>
  ) 
}

