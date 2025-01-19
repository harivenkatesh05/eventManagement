'use client'

import { signin } from '@/app/apis';
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import { useUser } from '@/context/UserContext';

export default function SignIn() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState<SignInForm>({ email: "", password: "" });
	const [googleLoading, setGoogleLoading] = useState(false);
	const { setUser } = useUser();
	const [redirect, setRedirect] = useState("");

	useEffect(() => {
		const redirectParam = searchParams.get('redirect');
		if (redirectParam) {
			setRedirect(redirectParam);
		}
	}, [searchParams]);
	
	const handleSignin = async (e: Event) => {
		e.preventDefault();
		const data = await signin(formData);
		if(data.message === "Login successful"){
			setUser(data.user);
			handleSignInSuccess()
		}
	}

	// const handleThirdpartySignIn = (provider: string) => {
	// 	console.log("Thirdparty Signin", provider);
	// }

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleGoogleSuccess = async (credentialResponse: { credential: string }) => {
		try {
			setGoogleLoading(true);
			const response = await fetch('/api/auth/google', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ credential: credentialResponse.credential })
			});

			const data = await response.json();
			if (response.ok) {
				setUser(data.user);
				handleSignInSuccess();
			} else {
				throw new Error(data.error || 'Google login failed');
			}
		} catch (error) {
			console.error('Google login error:', error);
			toast.error('Failed to login with Google');
		} finally {
			setGoogleLoading(false);
		}
	};

	const handleSignInSuccess = () => {
		const redirectPath = redirect || sessionStorage.getItem('redirectAfterLogin') || '/';
		if (sessionStorage.getItem('redirectAfterLogin')) {
			sessionStorage.removeItem('redirectAfterLogin');
		}
		router.push(redirectPath);
	};

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
										New to Bukit?<Link className="sidebar-register-link" href="/auth/signup">Sign up</Link>
									</div>
								</div>
							</div>
							<div className="col-xl-5 col-lg-6 col-md-7">
								<div className="registration">
									<form>
										<h2 className="registration-title">Sign in to Bukit</h2>
										<div className="form-group mt-5">
											<label className="form-label">Your Email*</label>
											<input className="form-control h_50" type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />																								
										</div>
										<div className="form-group mt-4">
											<div className="field-password">
												<label className="form-label">Password*</label>
												{/* <a className="forgot-pass-link" href="forgot_password.html">Forgot Password?</a> */}
											</div>
											<div className="loc-group position-relative">
												<input className="form-control h_50" type={showPassword ? "text" : "password"} placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />
												<span className="pass-show-eye" onClick={() => setShowPassword(!showPassword)}><i className="fas fa-eye-slash"></i></span>
											</div>
										</div>
										<button className="main-btn btn-hover w-100 mt-4" type="button" onClick={handleSignin as unknown as React.MouseEventHandler<HTMLButtonElement>}>Sign In <i className="fas fa-sign-in-alt ms-2"></i></button>
									</form>
									<div className="divider">
										<span>or</span>
									</div>
									<div className="social-btns-list">
										{googleLoading ? (
											<button className="social-login-btn" disabled>
												<i className="fa-solid fa-spinner fa-spin me-2"></i>
												Signing in...
											</button>
										) : (
											<GoogleLogin
												onSuccess={(credentialResponse) => {
													if (credentialResponse.credential) {
														handleGoogleSuccess(credentialResponse as { credential: string });
													}
												}}
												onError={() => {
													console.log('Login Failed');
													toast.error('Google login failed');
												}}
											/>
										)}
										{/* <button className="social-login-btn" onClick={() => handleThirdpartySignIn("facebook")}>
											<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 27"><g transform="translate(0)"><circle cx="13.5" cy="13.5" r="13.5" transform="translate(0 0)" fill="#3b5998"></circle><path d="M851.461,383.684h-3.1c-1.841,0-3.889.735-3.889,3.266.009.882,0,1.727,0,2.678h-2.13v3.215h2.2V402.1h4.035v-9.316h2.663l.241-3.163H848.5s.007-1.407,0-1.816c0-1,1.1-.943,1.164-.943.522,0,1.538,0,1.8,0v-3.176Z" transform="translate(-833.401 -379.385)" fill="#fff"></path></g></svg>
											Sign in with Facebook
										</button> */}
									</div>
									<div className="new-sign-link">
										New to Bukit?<Link className="signup-link" href="/auth/signup">Sign up</Link>
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
