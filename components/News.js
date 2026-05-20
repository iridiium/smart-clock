import { useState, useEffect } from 'react'

import Marquee from 'react-fast-marquee'

function shuffle (unshuffled) {
  const shuffled = unshuffled.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return shuffled
}

async function fetchTitles () {
  const res = await fetch('/api/feed')

  if (res.ok) {
    const data = await res.json()

    return data
  }
}

export default function News () {
  const [title, setTitle] = useState('')

  async function getTitles () {
    fetchTitles()
      .then(res => {
        setTitle(
          shuffle(res.feed.rss.channel.item.map(item => item.title))
          .join('\t\t\t\t\t\t')
        )
      })
  }

  useEffect(() => { getTitles() }, [])

  return (
    <div className="w-2/3">
      <Marquee className="text-3xl" speed="70" onCycleComplete={() => { getTitles() }}>
        <pre className="font-sans overflow-visible">{title}</pre>
      </Marquee>
    </div>
  )
}
