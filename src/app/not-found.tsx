import Link from 'next/link'
import React from 'react'

export default function NotFound() {
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
										<li className="breadcrumb-item active" aria-current="page">Error 404</li>
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
						<div className="col-xl-6 col-lg-8">
							<div className="error-404-content text-center">
								<h2>404</h2>
								<h4>Opps! Page not found</h4>
								<p>Seems you&apos;re looking for something that doesn&apos;t exist. If you think this is a problem with us, please tell us.</p>
								<Link href="/" className="main-btn btn-hover h_50"><i className="fa-solid fa-house me-3"></i>Back to home</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}