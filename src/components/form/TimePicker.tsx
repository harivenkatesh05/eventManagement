import { getTimeFromDate, setTimeToDate } from '@/util/date'
import React from 'react'

export default function TimePicker({title = 'Time', value, onChange}: {title?: string, value?: string, onChange: (value: string) => void}) {
	const time = value ? getTimeFromDate(value) : ""
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleTimeClick = (e: any) => {
		onChange(setTimeToDate(value ?? "", e.target.value))
	}

	return (
		<div className="clock-icon">
			<label className="form-label mt-3 fs-6">{title}</label>	
			<select className="selectpicker" data-size="5" data-live-search="true" value={time} onChange={handleTimeClick}>
				<option value="00:00">12:00 AM</option>
				<option value="00:15">12:15 AM</option>
				<option value="00:30">12:30 AM</option>
				<option value="00:45">12:45 AM</option>
				<option value="01:00">01:00 AM</option>
				<option value="01:15">01:15 AM</option>
				<option value="01:30">01:30 AM</option>
				<option value="01:45">01:45 AM</option>
				<option value="02:00">02:00 AM</option>
				<option value="02:15">02:15 AM</option>
				<option value="02:30">02:30 AM</option>
				<option value="02:45">02:45 AM</option>
				<option value="03:00">03:00 AM</option>
				<option value="03:15">03:15 AM</option>
				<option value="03:30">03:30 AM</option>
				<option value="03:45">03:45 AM</option>
				<option value="04:00">04:00 AM</option>
				<option value="04:15">04:15 AM</option>
				<option value="04:30">04:30 AM</option>
				<option value="04:45">04:45 AM</option>
				<option value="05:00">05:00 AM</option>
				<option value="05:15">05:15 AM</option>
				<option value="05:30">05:30 AM</option>
				<option value="05:45">05:45 AM</option>
				<option value="06:00">06:00 AM</option>
				<option value="06:15">06:15 AM</option>
				<option value="06:30">06:30 AM</option>
				<option value="06:45">06:45 AM</option>
				<option value="07:00">07:00 AM</option>
				<option value="07:15">07:15 AM</option>
				<option value="07:30">07:30 AM</option>
				<option value="07:45">07:45 AM</option>
				<option value="08:00">08:00 AM</option>
				<option value="08:15">08:15 AM</option>
				<option value="08:30">08:30 AM</option>
				<option value="08:45">08:45 AM</option>
				<option value="09:00">09:00 AM</option>
				<option value="09:15">09:15 AM</option>
				<option value="09:30">09:30 AM</option>
				<option value="09:45">09:45 AM</option>
				<option value="10:00">10:00 AM</option>
				<option value="10:15">10:15 AM</option>
				<option value="10:30">10:30 AM</option>
				<option value="10:45">10:45 AM</option>
				<option value="11:00">11:00 AM</option>
				<option value="11:15">11:15 AM</option>
				<option value="11:30">11:30 AM</option>
				<option value="11:45">11:45 AM</option>
				<option value="12:00">12:00 PM</option>
				<option value="12:15">12:15 PM</option>
				<option value="12:30">12:30 PM</option>
				<option value="12:45">12:45 PM</option>
				<option value="13:00">01:00 PM</option>
				<option value="13:15">01:15 PM</option>
				<option value="13:30">01:30 PM</option>
				<option value="13:45">01:45 PM</option>
				<option value="14:00">02:00 PM</option>
				<option value="14:15">02:15 PM</option>
				<option value="14:30">02:30 PM</option>
				<option value="14:45">02:45 PM</option>
				<option value="15:00">03:00 PM</option>
				<option value="15:15">03:15 PM</option>
				<option value="15:30">03:30 PM</option>
				<option value="15:45">03:45 PM</option>
				<option value="16:00">04:00 PM</option>
				<option value="16:15">04:15 PM</option>
				<option value="16:30">04:30 PM</option>
				<option value="16:45">04:45 PM</option>
				<option value="17:00">05:00 PM</option>
				<option value="17:15">05:15 PM</option>
				<option value="17:30">05:30 PM</option>
				<option value="17:45">05:45 PM</option>
				<option value="18:00">06:00 PM</option>
				<option value="18:15">06:15 PM</option>
				<option value="18:30">06:30 PM</option>
				<option value="18:45">06:45 PM</option>
				<option value="19:00">07:00 PM</option>
				<option value="19:15">07:15 PM</option>
				<option value="19:30">07:30 PM</option>
				<option value="19:45">07:45 PM</option>
				<option value="20:00">08:00 PM</option>
				<option value="20:15">08:15 PM</option>
				<option value="20:30">08:30 PM</option>
				<option value="20:45">08:45 PM</option>
				<option value="21:00">09:00 PM</option>
				<option value="21:15">09:15 PM</option>
				<option value="21:30">09:30 PM</option>
				<option value="21:45">09:45 PM</option>
				<option value="22:00">10:00 PM</option>
				<option value="22:15">10:15 PM</option>
				<option value="22:30">10:30 PM</option>
				<option value="22:45">10:45 PM</option>
				<option value="23:00">11:00 PM</option>
				<option value="23:15">11:15 PM</option>
				<option value="23:30">11:30 PM</option>
				<option value="23:45">11:45 PM</option>
			</select>
		</div>
  )
}
