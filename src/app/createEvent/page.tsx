import Link from 'next/link'
import React from 'react'

export default function CreateEvent() {
	return (
		<div className="wrapper">
			<div className="breadcrumb-block">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-10">
							<div className="barren-breadcrumb">
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item"><a href="index.html">Home</a></li>
										<li className="breadcrumb-item active" aria-current="page">Create</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="event-dt-block p-80">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-12 col-md-12">
							<div className="main-title text-center checkout-title">
								<h3>Create New Event</h3>
							</div>
						</div>
						<div className="col-xl-6 col-lg-8 col-md-12">
							<div className="create-block">
								<div className="row">
									<div className="col-md-6">
										<div className="main-card create-card mt-4">
											<div className="create-icon">
												<i className="fa-solid fa-video"></i>
											</div>
											<h4>Create an Online Event</h4>
											<Link href="/createEvent/online" className="main-btn btn-hover h_40 w-100">Create<i className="fa-solid fa-arrow-right ms-2"></i></Link>
										</div>
									</div>
									<div className="col-md-6">
										<div className="main-card create-card mt-4">
											<div className="create-icon">
												<i className="fa-solid fa-location-dot"></i>
											</div>
											<h4>Create an Venue Event</h4>
											<Link href="/createEvent/venue" className="main-btn btn-hover h_40 w-100">Create<i className="fa-solid fa-arrow-right ms-2"></i></Link>
										</div>
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
