import Head from 'next/head'

import Clock from '@components/Clock'
import News from '@components/News'

const Parser = require('rss-parser');

export const getStaticProps = async () => {
  try {
    const res = await new Parser().parseURL(
      "http://feeds.bbci.co.uk/news/world/rss.xml"
    );
    
    console.log(res);

    return {
      props: {feed: res}
    }
  } catch (err) {
    console.log(err);
  }
}

export default function Home({ feed }) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-indigo-900">
      <div>
        <Head>
          <title>Clock</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>

      <div className="flex flex-col space-y-12 items-center justify-center h-screen text-center text-indigo-100">
          <Clock />
          <News feed={feed} />
      </div>
    </div>
  )
}