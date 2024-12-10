export function getDateObj(dateString: string) {
	const date = new Date(dateString);
	return date;
}

export function isDateSatisfies(dateStr: string, condition: string): boolean {
	const dateObj = new Date(dateStr);
	const today = new Date();
	
	switch(condition) {
		case 'today':
			return dateObj.toDateString() === today.toDateString();
			
		case 'tomorrow':
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);
			return dateObj.toDateString() === tomorrow.toDateString();
			
		case 'this_week':
			const weekStart = new Date(today);
			const weekEnd = new Date(today);
			weekStart.setDate(today.getDate() - today.getDay());
			weekEnd.setDate(weekStart.getDate() + 6);
			return dateObj >= weekStart && dateObj <= weekEnd;
			
		case 'this_weekend':
			const weekendStart = new Date(today);
			const weekendEnd = new Date(today);
			weekendStart.setDate(today.getDate() + (6 - today.getDay())); // Saturday
			weekendEnd.setDate(today.getDate() + (7 - today.getDay())); // Sunday
			return dateObj >= weekendStart && dateObj <= weekendEnd;
			
		case 'next_week':
			const nextWeekStart = new Date(today);
			const nextWeekEnd = new Date(today);
			nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));
			nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
			return dateObj >= nextWeekStart && dateObj <= nextWeekEnd;
			
		case 'next_weekend':
			const nextWeekendStart = new Date(today);
			const nextWeekendEnd = new Date(today);
			nextWeekendStart.setDate(today.getDate() + (13 - today.getDay())); // Next Saturday
			nextWeekendEnd.setDate(today.getDate() + (14 - today.getDay())); // Next Sunday
			return dateObj >= nextWeekendStart && dateObj <= nextWeekendEnd;
			
		case 'this_month':
			return dateObj.getMonth() === today.getMonth() && 
				   dateObj.getFullYear() === today.getFullYear();
			
		case 'next_month':
			const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
			return dateObj.getMonth() === nextMonth.getMonth() && 
				   dateObj.getFullYear() === nextMonth.getFullYear();
			
		case 'this_year':
			return dateObj.getFullYear() === today.getFullYear();
			
		case 'next_year':
			return dateObj.getFullYear() === today.getFullYear() + 1;
			
		default:
			return true;
	}
}

export function formatDateToIST(date: Date) {
	return date.toLocaleString('en-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
		timeZone: 'Asia/Kolkata'
	});
}
