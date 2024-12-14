'use client'

import TimePicker from './TimePicker'
import DatePicker from './DatePicker'

interface DateTimePickerProps {
	datePickerTitle: string
	timePickerTitle?: string
	dateTime?: string
	onDateTimeChange: (date: string) => void
}

export default function DateTimePicker({ 
	dateTime, 
	datePickerTitle = 'Event Date.*',
	timePickerTitle = 'Time',
	onDateTimeChange,
}: DateTimePickerProps) {
	return (
		<div className="row g-3">
			<div className="col-md-6">
				<DatePicker 
					title={datePickerTitle} 
					placeholder="MM/DD/YYYY"
					value={dateTime}
					onChange={onDateTimeChange}
				/>
			</div>
			<div className="col-md-6">                                    
				<TimePicker 
					title={timePickerTitle}
					value={dateTime}
					onChange={onDateTimeChange}
				/>
			</div>
		</div>
	)
} 