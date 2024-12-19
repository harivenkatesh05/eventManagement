'use client'

import { signup } from '@/app/apis';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function SignUp() {

	const router = useRouter();
	const [formData, setFormData] = useState<User>({ firstName: "", lastName: "", email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSignup = async (e: Event) => {
		e.preventDefault();
        const data = await signup(formData);
        if(data.message === "User created successfully"){
            router.push("/auth/signin");
        }
	}

	const handleGoogleSuccess = async (credentialResponse: { credential: string }) => {
		try {
			const response = await fetch('/api/auth/google', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ credential: credentialResponse.credential })
			});

			const data = await response.json();
			if (response.ok) {
				router.push('/');
			} else {
				throw new Error(data.error || 'Google login failed');
			}
		} catch (error) {
			console.error('Google login error:', error);
			alert('Failed to login with Google');
		}
	}

	return (
		<div className="form-wrapper">
			<div className="app-form">
				<div className="app-form-sidebar">
					<div className="sidebar-sign-logo">
						<img src="/images/sign-logo.svg" alt="" />
					</div>
					<div className="sign_sidebar_text">
						<h1>The Easiest Way to Create Events and Sell More Tickets Online</h1>
					</div>
				</div>
				<div className="app-form-content">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-10 col-md-10">
								<div className="app-top-items">
									<Link href="/">
										<div className="sign-logo" id="logo">
											<img src="/images/logo.svg" alt="" />
											<img className="logo-inverse" src="/images/dark-logo.svg" alt="" />
										</div>
									</Link>
									<div className="app-top-right-link">
										Already have an account?<Link className="sidebar-register-link" href="/auth/signin">Sign In</Link>
									</div>
								</div>
							</div>
							<div className="col-xl-5 col-lg-6 col-md-7">
								<div className="registration">
									<form>
										<h2 className="registration-title">Sign up to Bukit</h2>
										<div className="row mt-3">
											<div className="col-lg-6 col-md-12">
												<div className="form-group mt-4">
													<label className="form-label">First Name*</label>
													<input className="form-control h_50" type="text" placeholder="" name="firstName" value={formData.firstName} onChange={handleChange} />																								
												</div>
											</div>
											<div className="col-lg-6 col-md-12">
												<div className="form-group mt-4">
													<label className="form-label">Last Name*</label>
													<input className="form-control h_50" type="text" placeholder="" name="lastName" value={formData.lastName} onChange={handleChange} />																								
												</div>
											</div>
											<div className="col-lg-12 col-md-12">
												<div className="form-group mt-4">
													<label className="form-label">Your Email*</label>
													<input className="form-control h_50" type="email" placeholder="" name="email" value={formData.email} onChange={handleChange} />																								
												</div>
											</div>
											<div className="col-lg-12 col-md-12">	
												<div className="form-group mt-4">
													<div className="field-password">
														<label className="form-label">Password*</label>
													</div>
													<div className="loc-group position-relative">
														<input className="form-control h_50" type={showPassword ? "text" : "password"} placeholder="" name="password" value={formData.password} onChange={handleChange} />
														<span className="pass-show-eye" onClick={() => {setShowPassword(!showPassword)}}><i className="fas fa-eye-slash"></i></span>
													</div>
												</div>
											</div>
											<div className="col-lg-12 col-md-12">		
												<button className="main-btn btn-hover w-100 mt-4" type="submit" onClick={(e) => handleSignup(e as unknown as Event)}>Sign Up</button>
											</div>
										</div>
									</form>
									<div className="agree-text">
										By clicking &quot;Sign up&quot;, you agree to Bukit <a href="#">Terms & Conditions</a> and have read the <a href="#">Privacy Policy</a>.
									</div>								
									<div className="divider">
										<span>or</span>
									</div>
									<div className="social-btns-list mb-lg-5">
										<GoogleLogin
											onSuccess={(credentialResponse) => {
												if (credentialResponse.credential) {
													handleGoogleSuccess({
														credential: credentialResponse.credential
													});
												}
											}}
											onError={() => {
												console.log('Login Failed');
											}}
										/>
										
										{/* <button className="social-login-btn" onClick={() => {handleThirdpartySignup("facebook")}}>
											<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 27"><g transform="translate(0)"><circle cx="13.5" cy="13.5" r="13.5" transform="translate(0 0)" fill="#3b5998"></circle><path d="M851.461,383.684h-3.1c-1.841,0-3.889.735-3.889,3.266.009.882,0,1.727,0,2.678h-2.13v3.215h2.2V402.1h4.035v-9.316h2.663l.241-3.163H848.5s.007-1.407,0-1.816c0-1,1.1-.943,1.164-.943.522,0,1.538,0,1.8,0v-3.176Z" transform="translate(-833.401 -379.385)" fill="#fff"></path></g></svg>
											Sign in with Facebook
										</button> */}
									</div>
									<div className="new-sign-link">
										Already have an account?<Link className="signup-link" href="/auth/signin">Sign In</Link>
									</div>
								</div>							
							</div>
						</div>
					</div>
					<div className="copyright-footer">
						© 2022, Bukit. All rights reserved. Powered by Gambolthemes
					</div>
				</div>			
			</div>
		</div>
	)
}
