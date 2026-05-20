import Head from 'next/head'
import { useRouter } from 'next/router'

import Clock from '@components/Clock'
import News from '@components/News'

export default function Home () {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-red-700">
      <div>
        <Head>
          <title>Clock</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>

      <div className="text-indigo-100">
        <div className="flex flex-col space-y-12 items-center justify-center h-screen text-center relative z-0">
            <Clock />
            <News />
        </div>
      </div>
    </div>
  )
}
