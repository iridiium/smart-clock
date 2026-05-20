import { useState, useEffect } from 'react'

async function fetchWeather () {
  const res = await fetch('/api/weather')

  if (res.ok) {
    const data = await res.json()

    return data
  }
}

export default function Weather () {
  const [localTemp, setLocalTemp] = useState('')
  const [iconCode, setIconCode] = useState('')
  const [iconDescription, setIconDescription] = useState('')

  async function getWeather () {
    fetchWeather()
      .then(res => {
        console.log('New got')
        setLocalTemp(Math.round(res.data.main.temp - 273).toString())
        setIconCode(res.data.weather['0'].icon)
        setIconDescription(res.data.weather['0'].description)
      })
  }

  useEffect(() => {
    getWeather()
    const id = setInterval(() => {
      getWeather()
    }, 600000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex space-x-6">
      <div>{localTemp + '°C'}</div>
      <img
        src={`http://openweathermap.org/img/w/${iconCode}.png`}
        height={50}
        width={50}
        alt={`${iconDescription}`}
      />
    </div>
  )
}
