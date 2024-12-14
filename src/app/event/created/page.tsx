import Link from 'next/link'
import React from 'react'

export default function EventCreated() {
	return (
		<div className="wrapper">
			<div className="breadcrumb-block">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-10">
							<div className="barren-breadcrumb">
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item"><Link href="/">Home</Link></li>
										<li className="breadcrumb-item active" aria-current="page">Event Created</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="event-dt-block p-80 pt-100">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-7 col-md-10">
							<div className="booking-confirmed-content">
								<div className="main-card">
									<div className="booking-confirmed-top text-center p_30">
										<div className="booking-confirmed-img mt-4">
											<img src="/images/confirmed.png" alt="" />
										</div>
										<h4>Event Created</h4>
										<p className="ps-lg-4 pe-lg-4">We are pleased to inform you that your request has been received and we will review it shortly and confirm the event.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}