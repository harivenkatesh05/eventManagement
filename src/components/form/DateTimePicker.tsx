'use client'

import { useEffect, useState } from 'react'
import TimePicker from './TimePicker'
import DatePicker from './DatePicker'

interface DateTimePickerProps {
	datePickerTitle: string
	timePickerTitle?: string
	onDateChange?: (date: string) => void
	defaultDate?: string
	defaultTime?: string
}

export default function DateTimePicker({ 
	datePickerTitle, 
	timePickerTitle = 'Time',
	onDateChange,
	defaultDate = '',
	defaultTime = '10:00'
}: DateTimePickerProps) {
	const [date, setDate] = useState(defaultDate)
	const [time, setTime] = useState(defaultTime)

	const getDate = () => {
		const dateObj = new Date(date)
		dateObj.setHours(dateObj.getHours() + 1)
		return dateObj.toISOString()
	}

	const handleDateChange = (newDate: string) => {
		setDate(newDate)
		onDateChange?.(getDate())
	}

	const handleTimeChange = (newTime: string) => {
		setTime(newTime)
		onDateChange?.(getDate())
	}

	return (
		<div className="row g-3">
			<div className="col-md-6">
				<DatePicker 
					title={datePickerTitle} 
					placeholder="MM/DD/YYYY"
					value={date}
					onChange={handleDateChange}
				/>
			</div>
			<div className="col-md-6">                                    
				<TimePicker 
					title={timePickerTitle}
					value={time}
					onChange={handleTimeChange}
				/>
			</div>
		</div>
	)
} 