'use client'

import { signup } from '@/app/apis';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

interface FormErrors {
	firstName: boolean;
	lastName: boolean;
	email: boolean;
	phoneNumber: boolean;
	password: boolean;
}

export default function SignUp() {

	const router = useRouter();
	const [formData, setFormData] = useState<User>({ 
		firstName: "", 
		lastName: "", 
		email: "", 
		phoneNumber: "", 
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({
		firstName: false,
		lastName: false,
		email: false,
		phoneNumber: false,
		password: false
	});

	const validateForm = () => {
		const newErrors = {
			firstName: !formData.firstName.trim(),
			lastName: !formData.lastName.trim(),
			email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
			phoneNumber: !formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber),
			password: !formData.password.trim() || formData.password.length < 6
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some(error => error);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name as keyof FormErrors;
		if (field in errors) {
			setErrors(prev => ({ ...prev, [field]: false }));
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSignup = async (e: Event) => {
		e.preventDefault();
		if (!validateForm()) {
			toast.error('Please fill all required fields correctly');
			return;
		}

		try {
			const data = await signup(formData);
			if(data.message === "User created successfully"){
				router.push("/auth/signin");
				toast.success('Account created successfully! Please sign in.');
			}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error('Failed to create account');
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
									<Link href="/" style={{justifyContent: 'center', display: 'grid'}}>
										<div className="main-logo" id="logo" style={{display: 'flex', alignItems: 'center'}}>
											<img src='/images/icons/logo.png' alt="logo" style={{width: '30%', height: 'auto', margin: '10px'}}/>
											<img src="/images/icons/light-logo-name.png" alt="logo" style={{width: '70%'}}/>
										</div>
										<div className="main-logo" id="logo" style={{display: 'flex', alignItems: 'center'}}>
											<img className="logo-inverse" src='/images/icons/logo.png' style={{width: '30%', height: 'auto', margin: '10px'}} alt="logo" />
											<img className="logo-inverse" src="/images/icons/dark-logo-name.png" alt="logo" />
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
													<label className="form-label">Phone Number*</label>
													<input 
														className={`form-control h_50 ${errors.phoneNumber ? 'error-input' : ''}`}
														type="tel" 
														placeholder="Enter your phone number"
														name="phoneNumber"
														value={formData.phoneNumber}
														onChange={handleChange}
													/>
													{errors.phoneNumber && (
														<div className="error-message">Please enter a valid 10-digit phone number</div>
													)}
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
						© 2024, Bukit. All rights reserved. Powered by shree nex tech
					</div>
				</div>			
			</div>
		</div>
	)
}
