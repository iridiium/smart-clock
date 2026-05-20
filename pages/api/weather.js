import 'dotenv/config'

const GEOCODE_API_LINK = 'http://api.openweathermap.org/geo/1.0/direct?'
const WEATHER_INFO_API_LINK = 'https://api.openweathermap.org/data/2.5/weather'

export default async function handler (req, res) {
  try {
    const data = await fetch(
      GEOCODE_API_LINK +
      `q=${'London'}&limit=1&appid=${process.env.WEATHER_API_KEY}`
    )
      .then(coords => coords.json())
      .then(coords => fetch(
        WEATHER_INFO_API_LINK +
        `?lat=${coords[0].lat}&lon=${coords[0].lon}` +
        `&appid=${process.env.WEATHER_API_KEY}`,
        { next: { revalidate: 3600 } })
      )
      .then(weather => weather.json())

    res.status(200).json({ data })
  } catch (err) {
    res.status(400)
  }
}
