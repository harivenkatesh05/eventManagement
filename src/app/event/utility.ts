import { formatDateToIST, getDateObj } from "@/util/date";

export const getBookingStatus = (startDate: string, endDate: string, eventDate: string, remaining: number) => {
	const now = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);
	const event = new Date(eventDate);
	if (now < start) {
		return {
			status: 'upcoming',
			text: 'Tickets will be available from ' + formatDateToIST(start),
		};
	} else if (now > end || now > event) {
		return { status: 'ended', text: 'Event Ended' };
	} else if (remaining <= 0) {
		return { status: 'soldout', text: 'Sold Out' };
	} else {
		return { status: 'active', text: 'Book Now' };
	}
};

export const handleShare = async (platform: string) => {
    const currentUrl = window.location.href;
    const subject = 'Check out this page!';
    const body = `I found this page interesting: ${window.location.href}`;

    switch (platform) {
        case 'facebook':
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentUrl
                )}`,
                '_blank'
            );
            break;

        case 'facebook':
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentUrl
                )}`,
                '_blank'
            );
            break;
        case 'linkedin':
            window.open(
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    currentUrl
                )}`,
                '_blank'
            );
            break;
        case 'email':
            window.open(
                `mailto:?subject=${encodeURIComponent(
                    subject
                )}&body=${encodeURIComponent(body)}`,
                '_blank'
            );
            break;
    }
    // }
};

export const handleSetRemainder = (product: string, event: EventFullDetail) => {
    const dateTime = getDateObj(event.eventDate);
	
    // Format end time by adding duration hours to start time
    const endTime = new Date(dateTime);
    endTime.setHours(endTime.getHours() + event!.eventDuration);

    // Format description by removing line breaks and HTML
    const description = event!.description
        .replace(/\n/g, ' ')
        .replace(/<[^>]*>/g, '');

    // Base calendar event details
    const details = {
        title: event!.name,
        description: description,
        startTime: dateTime.toISOString(),
        endTime: endTime.toISOString(),
        location: event!.type === 'online' ? 'Online Event' : 'event!.location',
    };

    switch (product) {
        case 'outlook': {
            const url = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
                details.title
            )}&body=${encodeURIComponent(details.description)}&startdt=${
                details.startTime
            }&enddt=${details.endTime}&location=${encodeURIComponent(
                details.location
            )}&path=/calendar/action/compose`;
            window.open(url, '_blank');
            break;
        }
        case 'apple': {
            const url = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${details.startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTEND:${details.endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
SUMMARY:${details.title}
DESCRIPTION:${details.description}
LOCATION:${details.location}
END:VEVENT
END:VCALENDAR`;
            window.open(url, '_blank');
            break;
        }
        case 'google': {
            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                details.title
            )}&details=${encodeURIComponent(
                details.description
            )}&dates=${details.startTime
                .replace(/[-:]/g, '')
                .replace(/\.\d{3}/, '')}/${details.endTime
                .replace(/[-:]/g, '')
                .replace(/\.\d{3}/, '')}&location=${encodeURIComponent(
                details.location
            )}`;
            window.open(url, '_blank');
            break;
        }
    }
};
