'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Header() {
	const pathname = usePathname();
	const isActive = (pattern: string) => {
		// Check if pathname matches the pattern with wildcard
		const regex = new RegExp(pattern.replace('*', '.*'));
		return regex.test(pathname!);
	};
	

	return (
		<header className="header">
			<div className="header-inner">
				<nav className="navbar navbar-expand-lg bg-barren barren-head navbar fixed-top justify-content-sm-start pt-0 pb-0">
					<div className="container">
						<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
							<span className="navbar-toggler-icon">
								<i className="fa-solid fa-bars"></i>
							</span>
						</button>
						<Link className="navbar-brand order-1 order-lg-0 ml-lg-0 ml-2 me-auto" href="/">
							<div className="res-main-logo">
								<img src="/images/logo-icon.svg" alt="" />
							</div>
							<div className="main-logo" id="logo">
								<img src="/images/logo.svg" alt="" />
								<img className="logo-inverse" src="/images/dark-logo.svg" alt="" />
							</div>
						</Link>
						<div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
							<div className="offcanvas-header">
								<div className="offcanvas-logo" id="offcanvasNavbarLabel">
									<img src="/images/logo-icon.svg" alt="" />
								</div>
								<button type="button" className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close">
									<i className="fa-solid fa-xmark"></i>
								</button>
							</div>
							<div className="offcanvas-body">
								<div className="offcanvas-top-area">
									<div className="create-bg">
										<a href="create.html" className="offcanvas-create-btn">
											<i className="fa-solid fa-calendar-days"></i>
											<span>Create Event</span>
										</a>
									</div>
								</div>
								<ul className="navbar-nav justify-content-end flex-grow-1 pe_5">
									<li className="nav-item">
										<Link className={"nav-link " + (pathname === "/"  ? 'active' : '')} aria-current="page" href="/">Home</Link>
									</li>
									<li className="nav-item">
										<Link className={"nav-link " + (isActive('/explore*') ? 'active' : '')} href="/explore" aria-expanded="false">
											Explore Events
										</Link>
										{/* <ul className="dropdown-menu dropdown-submenu">
											<li>
												<a className="dropdown-item" href="/explore">Explore Events</a>
											</li>
											<li>
												<a className="dropdown-item" href="venue_event_detail_view.html">Venue Event Detail View</a>
											</li>
											<li>
												<a className="dropdown-item" href="online_event_detail_view.html">Online Event Detail View</a>
											</li>
										</ul> */}
									</li>
									<li className={"nav-item dropdown " + (isActive('/help*') ? 'active' : '')}>
										<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
											Help
										</a>
										<ul className="dropdown-menu dropdown-submenu">
											<li>
												<Link className="dropdown-item" href="/faq">FAQ</Link>
											</li>
											<li>
												<Link className="dropdown-item" href="/contact">Contact Us</Link>
											</li>
										</ul>
									</li>
									{/* <li className={"nav-item dropdown" + (isActive('index') ? 'active' : '')}>
										<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
											Pages
										</a>
										<ul className="dropdown-menu dropdown-submenu">
											<li>
												<a className="dropdown-item submenu-item" href="#">Other Pages</a>
												<ul className="submenu dropdown-menu">
													<li>
														<a className="dropdown-item pe-5" href="sign_in.html">Sign In</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="sign_up.html">Sign Up</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="forgot_password.html">Forgot Password</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="about_us.html">About Us</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="checkout.html">Checkout</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="checkout_premium.html">Checkout Premium</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="invoice.html">Invoice</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="coming_soon.html">Coming Soon</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="error_404.html">Error 404</a>
													</li>
												</ul>
											</li>
											<li>
												<a className="dropdown-item submenu-item" href="#">Create Event</a>
												<ul className="submenu dropdown-menu">
													<li>
														<a className="dropdown-item pe-5" href="create.html">Create</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="create_venue_event.html">Create Venue Event</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="create_online_event.html">Create Online Event</a>
													</li>
												</ul>
											</li>
											<li>
												<a className="dropdown-item submenu-item" href="#">Events View</a>
												<ul className="submenu dropdown-menu">
													<li>
														<a className="dropdown-item pe-5" href="online_event_detail_view.html">Online Event Detail View</a>
													</li>
													<li>
														<a className="dropdown-item pe-5" href="venue_event_detail_view.html">Venue Event Detail View</a>
													</li>
												</ul>
											</li>
											<li>
												<a className="dropdown-item" href="booking_confirmed.html">Booking Confirmed</a>
											</li>
											<li>
												<a className="dropdown-item" href="attendee_profile_view.html">Attendee Profile View</a>
											</li>
											<li>
												<a className="dropdown-item" href="organiser_profile_view.html">Organiser Profile View</a>
											</li>
											<li>
												<a className="dropdown-item" href="my_organisation_dashboard.html">Organization Dashboard</a>
											</li>
											<li>
												<a className="dropdown-item" href="sell_tickets_online.html">Sell Tickets Online</a>
											</li>
											<li>
												<a className="dropdown-item" href="refer_a_friend.html">Refer a Friend</a>
											</li>
											<li>
												<a className="dropdown-item" href="term_and_conditions.html">Terms & Conditions</a>
											</li>
											<li>
												<a className="dropdown-item" href="privacy_policy.html">Privacy Policy</a>
											</li>
										</ul>
									</li> */}
								</ul>
							</div>
							<div className="offcanvas-footer">
								<div className="offcanvas-social">
									<h5>Follow Us</h5>
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
						<div className="right-header order-2">
							<ul className="align-self-stretch">
								<li>
									<a href="create.html" className="create-btn btn-hover">
										<i className="fa-solid fa-calendar-days"></i>
										<span>Create Event</span>
									</a>
								</li>
								<li className="dropdown account-dropdown">
									<a href="#" className="account-link" role="button" id="accountClick" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
										<img src="/images/profile-imgs/img-13.jpg" alt="" />
										<i className="fas fa-caret-down arrow-icon"></i>
									</a>
									<ul className="dropdown-menu dropdown-menu-account dropdown-menu-end" aria-labelledby="accountClick">
										<li>
											<div className="dropdown-account-header">
												<div className="account-holder-avatar">
													<img src="/images/profile-imgs/img-13.jpg" alt="" />
												</div>
												<h5>John Doe</h5>
												<p>johndoe@example.com</p>
											</div>
										</li>
										<li className="profile-link">
											<a href="my_organisation_dashboard.html" className="link-item">My Organisation</a>
											<a href="organiser_profile_view.html" className="link-item">My Profile</a>
											<a href="sign_in.html" className="link-item">Sign Out</a>
										</li>
									</ul>
								</li>
								<li>
									<div className="night_mode_switch__btn">
										<div id="night-mode" className="fas fa-moon fa-sun"></div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="overlay"></div>
			</div>
		</header>
	)
}
