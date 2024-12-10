'use client'

import { useEffect } from 'react'
import TimePicker from './TimePicker'
import DatePicker from './DatePicker'

interface DateTimePickerProps {
	onDateChange?: (date: string) => void
	onDurationChange?: (duration: string) => void
}

export default function DateTimePickerWithDuration({ onDateChange, onDurationChange }: DateTimePickerProps) {
	useEffect(() => {
		// // Initialize datepicker
		// (globalThis as any).$('.datepicker-here').datepicker({
		// 	onSelect: (formattedDate: string) => {
		// 		onDateChange(formattedDate)
		// 	}
		// })
	}, [])

	return (
		<div className="row g-2">
			<div className="col-md-6">
				<DatePicker title="Event Date.*" placeholder="MM/DD/YYYY" />
			</div>
			<div className="col-md-6">																		
				<div className="row g-2">
					<div className="col-md-6">
						<TimePicker />
					</div>
					<div className="col-md-6">
						<label className="form-label mt-3 fs-6">Duration</label>	
						<select className="selectpicker" data-size="5" data-live-search="true" defaultValue={"60"}>
							<option value="15">15m</option>
							<option value="30">30m</option>
							<option value="45">45m</option>
							<option value="60">1h</option>
							<option value="75">1h 15m</option>
							<option value="90">1h 30m</option>
							<option value="105">1h 45m</option>
							<option value="120">2h</option>
							<option value="135">2h 15m</option>
							<option value="150">2h 30m</option>
							<option value="165">2h 45m</option>
							<option value="180">3h</option>
							<option value="195">3h 15m</option>
							<option value="210">3h 30m</option>
							<option value="225">3h 45m</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	)
} 