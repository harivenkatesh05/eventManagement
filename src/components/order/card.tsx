'use client'

import { formatDateToIST, getDateObj } from '@/util/date';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

function PurchaseCard({ purchase }: { purchase: PurchaseInfoType }) {
	const [imageSrc, setImageSrc] = useState(purchase.event.image ?? '/images/event-imgs/big-1.jpg');
	const handleError = () => {
		setImageSrc(`/images/event-imgs/big-1.jpg`);
	}

  	return (
		<div className="tab-pane fade active show" role="tabpanel" aria-labelledby="orders-tab">
			<div className="main-card mt-4">
				<div className="card-top p-4">
					<div className="card-event-img">
						<Image src={imageSrc} alt="event-img" width={100} height={100} onError={handleError} />
					</div>
					<div className="card-event-dt">
						<h5>{purchase.event.name}</h5>
						<div className="invoice-id">Invoice ID : <span>{purchase.id}</span></div>
					</div>
				</div>
				<div className="card-bottom">
					<div className="card-bottom-item">
						<div className="card-icon">
							<i className="fa-solid fa-calendar-days"></i>
						</div>
						<div className="card-dt-text">
							<h6>Event Starts on</h6>
							<span>{formatDateToIST(getDateObj(purchase.event.date))}</span>
						</div>
					</div>
					<div className="card-bottom-item">
						<div className="card-icon">
							<i className="fa-solid fa-ticket"></i>
						</div>
						<div className="card-dt-text">
							<h6>Total Tickets</h6>
							<span>{purchase.tickets}</span>
						</div>
					</div>
					<div className="card-bottom-item">
						<div className="card-icon">
							<i className="fa-solid fa-money-bill"></i>
						</div>
						<div className="card-dt-text">
							<h6>Paid Amount</h6>
							<span>INR {purchase.totalAmount}</span>
						</div>
					</div>
					<div className="card-bottom-item">
						<div className="card-icon">
							<i className="fa-solid fa-money-bill"></i>
						</div>
						<div className="card-dt-text">
							<h6>Invoice</h6>
							<Link href={`/invoice/${purchase.id}`}>Download</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(PurchaseCard)