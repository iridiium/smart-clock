import { useState, useEffect } from 'react'

import Weather from '@components/Weather'

const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday'
]

const monthsOfYear = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
]

export default function Clock () {
  // Gets time and date
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setDate(new Date())
    }, 100)

    return () => clearInterval(id)
  }, [])

  // Pass weather as a prop
  return (
    <div className="space-y-12">
      <div className="text-4xl flex space-x-5">
        <p>
          {`${daysOfWeek[date.getDay()]}, 
            ${monthsOfYear[date.getMonth()]} 
            ${date.getDate()}, 
            ${date.getFullYear()}`}
        </p>
        <p>|</p>
        <Weather />
      </div>
      <div className="font-bold text-8xl">
        <h1 className="title">{date.getHours() +
          ':' +
          ('0' + date.getMinutes()).slice(-2)}
        </h1>
      </div>
    </div>
  )
}
