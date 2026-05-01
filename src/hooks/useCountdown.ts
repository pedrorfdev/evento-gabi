import { useState, useEffect } from 'react'

interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function calcRemaining(target: Date): CountdownResult {
  const diff = target.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

export function useCountdown(isoDate: string): CountdownResult {
  const [remaining, setRemaining] = useState<CountdownResult>(() =>
    calcRemaining(new Date(isoDate))
  )

  useEffect(() => {
    const target = new Date(isoDate)
    const tick = () => setRemaining(calcRemaining(target))

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [isoDate])

  return remaining
}
