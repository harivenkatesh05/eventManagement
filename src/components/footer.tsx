import React from 'react'

export default function Footer() {
	return (
		<footer className="footer mt-auto">
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-md-6">
							<div className="footer-content">
								<h4>Company</h4>
								<ul className="footer-link-list">
									<li>
										<a href="about_us.html" className="footer-link">About Us</a>
									</li>
									<li>
										<a href="help_center.html" className="footer-link">Help Center</a>
									</li>
									<li>
										<a href="faq.html" className="footer-link">FAQ</a>
									</li>
									<li>
										<a href="contact_us.html" className="footer-link">Contact Us</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="footer-content">
								<h4>Useful Links</h4>
								<ul className="footer-link-list">
									<li>
										<a href="create.html" className="footer-link">Create Event</a>
									</li>
									<li>
										<a href="sell_tickets_online.html" className="footer-link">Sell Tickets Online</a>
									</li>
									<li>
										<a href="privacy_policy.html" className="footer-link">Privacy Policy</a>
									</li>
									<li>
										<a href="term_and_conditions.html" className="footer-link">Terms & Conditions</a>
									</li>
								</ul>
							</div>
						</div>	
						<div className="col-lg-4 col-md-6">
							<div className="footer-content">
								<h4>Follow Us</h4>
								<ul className="social-links">
									<li>
										<a href="#" className="social-link">
											<i className="fab fa-facebook-square"></i>
										</a>
									</li>
									<li>
										<a href="#" className="social-link">
											<i className="fab fa-instagram"></i>
										</a>
									</li>
									<li>
										<a href="#" className="social-link">
											<i className="fab fa-twitter"></i>
										</a>
									</li>
									<li>
										<a href="#" className="social-link">
											<i className="fab fa-linkedin-in"></i>
										</a>
									</li>
									<li>
										<a href="#" className="social-link">
											<i className="fab fa-youtube"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="footer-copyright-text">
								<p className="mb-0">© 2022, <strong>Barren</strong>. All rights reserved. Powered by Gambolthemes</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
