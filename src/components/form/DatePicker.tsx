'use client'

import { useEffect } from 'react'

interface DatePickerProps {
	title: string
	placeholder?: string
	value?: string
	onChange?: (date: string) => void
}

export default function DatePicker({ title, placeholder = "MM/DD/YYYY", value, onChange }: DatePickerProps) {
	useEffect(() => {
		// Initialize datepicker
		setTimeout(() => {
			(globalThis as any).$('.datepicker-here').datepicker({
				language: 'en',
				autoClose: true,
				dateFormat: 'mm/dd/yyyy',
				onSelect: function(formattedDate: string) {
					onChange?.(formattedDate)
				}
			})
		}, 100)
	}, [])

	return (
		<>
			<label className="form-label mt-3 fs-6">{title}</label>
			<div className="loc-group position-relative">
				<input 
					className="form-control h_50 datepicker-here" 
					type="text" 
					placeholder={placeholder}
					value={value}
					readOnly
				/>
				<span className="absolute-icon"><i className="fa-solid fa-calendar-days"></i></span>
			</div>
		</>
	)
}
