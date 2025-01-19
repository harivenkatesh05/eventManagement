'use client'

import { fetchUserOrders, sendPhoneOTP, updateUserProfile } from '@/app/apis';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Link from 'next/link'
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import OTPVerificationModal from '@/components/auth/OTPVerificationModal';
import PurchaseCard from '@/components/order/card'

export default function MyProfile() {
	const { user, setUser } = useUser();
	const [isEditing, setIsEditing] = useState(false);
	const [activeTab, setActiveTab] = useState('about');
	const [orders, setOrders] = useState<PurchaseType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isUserUpdating, setIsUserUpdating] = useState(false);
	const [showPhoneNumberVerificationModal, setShowPhoneNumberVerificationModal] = useState(false);
	const [userProfile, setUserProfile] = useState<UserProfile>({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		phoneNumber: user?.phoneNumber || '',
		phoneNumberVerfied: user?.phoneNumberVerfied || false
	});
	
	useEffect(() => {
		if(user) {
			setUserProfile(user);
			setIsLoading(false);
		} 
	}, [user]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleUpdate = async () => {
		try {
			// if (userProfile.phoneNumber !== user?.phoneNumber) {
			// 	await updatePhone(userProfile.email, userProfile.phoneNumber);
			// }
			// if (user) {
			// 	setUser({ 
			// 		...userProfile,
			// 	});
			// }
			setIsUserUpdating(true);
			const user = await updateUserProfile(userProfile);
			setUser(user);
			setUserProfile(user);
			setIsUserUpdating(false);
			toast.success('Profile updated successfully');
		} catch (error) {
			console.error('Failed to update profile:', error);
			toast.error('Failed to update profile');
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
	};

	const handleVerifyPhone = () => {
		sendPhoneOTP(userProfile.phoneNumber).then(() => {
			setShowPhoneNumberVerificationModal(true)
		})
	}

	const handleOrderLoad = () => {
		setActiveTab('orders')
		setIsLoading(true)
		fetchUserOrders().then((loadedorders) => {
			setOrders(loadedorders)
			setIsLoading(false)
		})
	}

	if (isLoading) {
		return <ProfileSkeleton />;
	}

	const orderCards = orders.map((order) => {
		return <PurchaseCard key={order.id} purchase={order}></PurchaseCard>
	})

	return (
		<>
			{showPhoneNumberVerificationModal && (
				<OTPVerificationModal
					onVerificationSuccess={() => {
						setUserProfile({ ...userProfile, phoneNumberVerfied: true })
						setShowPhoneNumberVerificationModal(false)
					}}
				/>
			)}
			<div className="wrapper">
				<div className="breadcrumb-block">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-10">
								<div className="barren-breadcrumb">
									<nav aria-label="breadcrumb">
										<ol className="breadcrumb">
											<li className="breadcrumb-item"><Link href="/">Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">My Profile</li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="profile-container container mt-5 mb-5">
					<div className="row">
						<div className="col-12">
							<div className="profile-tabs mb-4">
								<ul className="nav nav-tabs">
									<li className="nav-item">
										<button 
											className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
											onClick={() => setActiveTab('about')}
										>
											About
										</button>
									</li>
									<li className="nav-item">
										<button 
											className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
											onClick={handleOrderLoad}
										>
											My Orders
										</button>
									</li>
								</ul>
							</div>

							{activeTab === 'about' && (
								<div className="profile-details card">
									<div className="card-body">
										<div className="d-flex justify-content-between align-items-center mb-4">
											<h3 className="card-title">Profile Information</h3>
											{!isEditing && (
												<div className='d-flex gap-3'>
													{userProfile?.phoneNumber && !userProfile?.phoneNumberVerfied && <button className="create-btn btn-hover" onClick={handleVerifyPhone}>
														Verify PhoneNumber
													</button>}
													<button className="create-btn btn-hover" onClick={handleEdit}>
														Edit Profile
													</button>
												</div>
											)}
										</div>
										<div className="row">
											<div className="col-md-6 mb-3">
												<label className="form-label">First Name</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													value={userProfile.firstName}
													onChange={handleChange}
													disabled={!isEditing}
												/>
											</div>
											<div className="col-md-6 mb-3">
												<label className="form-label">Last Name</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													value={userProfile.lastName}
													onChange={handleChange}
													disabled={!isEditing}
												/>
											</div>
											<div className="col-md-6 mb-3">
												<label className="form-label">Email</label>
												<input
													type="email"
													className="form-control"
													name="email"
													value={userProfile.email}
													disabled
												/>
											</div>
											<div className="col-md-6 mb-3">
												<label className="form-label">Phone Number</label>
												<input
													type="tel"
													className="form-control"
													name="phoneNumber"
													value={userProfile.phoneNumber}
													onChange={handleChange}
													disabled={!isEditing}
												/>
											</div>
										</div>
										{isEditing && (
											<div className="mt-3">
												<button className="create-btn btn-hover me-2" onClick={handleUpdate}>
													{isUserUpdating ? 'Updating...' : 'Update Profile'}
												</button>
												<button className="cancel-btn create-btn btn-hover" onClick={() => setIsEditing(false)}>
													Cancel
												</button>
											</div>
										)}
									</div>
								</div>
							)}

							{activeTab === 'orders' && (
								<div className="orders-list card">
									<div className="card-body">
										<h3 className="card-title mb-4">Order History</h3>
										{orders.length === 0 ? (
											<p className="text-center">No orders found</p>
										) : (
											orderCards
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
		
	)
}
