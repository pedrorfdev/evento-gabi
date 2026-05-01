import { useState, useEffect } from 'react'

function calc(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

export function useCountdown(isoDate: string) {
  const [timeLeft, setTimeLeft] = useState(() => calc(isoDate))

  useEffect(() => {
    setTimeLeft(calc(isoDate))
    const id = setInterval(() => setTimeLeft(calc(isoDate)), 1000)
    return () => clearInterval(id)
  }, [isoDate])

  return timeLeft
}