const parser = require('xml2json')

export default async function handler (req, res) {
  try {
    // const feed = await new Parser().parseURL(
    //   'http://feeds.bbci.co.uk/news/world/rss.xml'
    // )

    const feed = await fetch(
      'http://feeds.bbci.co.uk/news/world/rss.xml',
      { next: { revalidate: 3600 } }
    ).then(data => data.text())
      .then(xml => JSON.parse(parser.toJson(xml)))

    res.status(200).json({ feed })
  } catch (err) {
    res.status(400)
  }
}
