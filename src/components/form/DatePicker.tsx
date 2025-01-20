'use client'

import { useEffect, useId } from 'react'

interface DatePickerProps {
	title: string
	onChange: (date: string) => void
	placeholder?: string
	value?: string
}

export default function DatePicker({ title, placeholder = "MM/DD/YYYY", value, onChange }: DatePickerProps) {
	const uniqueId = useId().replace(/:/g, '-');
	const datepickerId = `datepicker${uniqueId}`;

	useEffect(() => {
		setTimeout(() => {
			$.fn.datepicker.language['en'] = {
				days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
				monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				today: 'Today',
				clear: 'Clear',
				dateFormat: 'mm/dd/yyyy',
				timeFormat: 'hh:ii aa',
				firstDay: 0
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(globalThis as any).$(`#${datepickerId}`).datepicker({
				language: 'en',
				autoClose: true,
				onSelect: function(formattedDate: string) {
					const existingDate = value ? new Date(value) : new Date();
					const newDate = new Date(formattedDate);
					
					newDate.setHours(existingDate.getHours());
					newDate.setMinutes(existingDate.getMinutes());

					onChange(newDate.toISOString())
				}
			})
		}, 1000)
	}, [datepickerId, onChange, value])

	return (
		<>
			<label className="form-label mt-3 fs-6">{title}</label>
			<div className="loc-group position-relative">
				<input 
					id={datepickerId}
					className="form-control h_50"
					type="text" 
					placeholder={placeholder}
					value={value ? new Date(value).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : ''}
					readOnly
				/>
				<span className="absolute-icon"><i className="fa-solid fa-calendar-days"></i></span>
			</div>
		</>
	)
}
