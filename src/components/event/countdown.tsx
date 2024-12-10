'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown({ targetDate }: CountdownProps) {
	
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	})

  useEffect(() => {
	const calculateTimeLeft = () => {
		const difference = targetDate.getTime() - new Date().getTime()
		
		if (difference > 0) {
			setTimeLeft({
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60)
			})
		} else {
			setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
		}
	}

	calculateTimeLeft()
	const timer = setInterval(calculateTimeLeft, 1000)

	return () => clearInterval(timer)
  }, [targetDate])

  return (
	<div className="countdown">
	  <div className="countdown-item">
		<span>{timeLeft.days}</span>days
	  </div>
	  <div className="countdown-item">
		<span>{timeLeft.hours}</span>Hours
	  </div>
	  <div className="countdown-item">
		<span>{timeLeft.minutes}</span>Minutes
	  </div>
	  <div className="countdown-item">
		<span>{timeLeft.seconds}</span>Seconds
	  </div>
	</div>
  )
} 