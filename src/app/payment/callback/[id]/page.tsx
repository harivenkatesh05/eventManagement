'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { formatDateToIST } from '@/util/date';

interface TransactionState {
	status: 'success' | 'failure' | 'pending';
	message: string;
	purchase?: {
		id: string;
		eventId: string;
		event: {
			name: string;
			image: string;
			date: string;
			type: string;
		};
		tickets: number;
		totalAmount: number;
		barcode: string;
	};
}

export default function TransactionComplete() {
	const pathname = usePathname();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [transaction, setTransaction] = useState<TransactionState | null>(null);

	useEffect(() => {
		const id = pathname.split('/')[3];

		const checkTransactionStatus = async () => {
			try {
				const response = await fetch(`/api/payment/status/${id}`);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || 'Failed to fetch transaction status');
				}

				setTransaction(data);
			} catch (error) {
				console.error('Error fetching transaction status:', error);
				toast.error('Failed to verify payment status');
				setTransaction({
					status: 'failure',
					message: 'Failed to verify payment status'
				});
			} finally {
				setLoading(false);
			}
		};

		checkTransactionStatus();
	}, [pathname]);

	if (loading) {
		return (
			<div className="wrapper">
				<div className="event-dt-block p-80">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-xl-5 col-lg-7 col-md-10">
								<div className="booking-confirmed-content">
									<div className="main-card">
										<div className="booking-confirmed-top text-center">
											<div className="booking-confirmed-img mt-4">
												<img src="/images/loading.gif" alt="Loading" />
											</div>
											<h4>Verifying Payment...</h4>
											<p>Please wait while we confirm your transaction.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="wrapper">
			<div className="event-dt-block p-80">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-7 col-md-10">
							<div className="booking-confirmed-content">
								<div className="main-card">
									{transaction?.status === 'success' ? (
										<>
											<div className="booking-confirmed-top text-center">
												<div className="booking-confirmed-img mt-4">
													<img src="/images/confirmed.svg" alt="" />
												</div>
												<h4>Booking Confirmed!</h4>
												<p>Your tickets have been booked successfully</p>
											</div>
											<div className="confirmation-btn">
												<button 
													className="main-btn btn-hover h_50 w-100 mt-5"
													onClick={() => router.push(`/invoice/${transaction.purchase?.id}`)}
												>
													View E-Ticket
												</button>
											</div>
											<div className="booking-confirmed-bottom">
												<div className="booking-confirmed-bottom-bg">
													<div className="event-order-dt">
														<div className="event-thumbnail-img">
															<img src={transaction.purchase?.event.image} alt="" />
														</div>
														<div className="event-order-dt-content">
															<h5>{transaction.purchase?.event.name}</h5>
															<span>{formatDateToIST(new Date(transaction.purchase?.event.date || ''))}</span>
															<div className="category-type">
																{transaction.purchase?.event.type} Event
															</div>
														</div>
													</div>
													<div className="order-total-block">
														<div className="order-total-dt">
															<div className="order-text">Total Tickets</div>
															<div className="order-number">{transaction.purchase?.tickets}</div>
														</div>
														<div className="divider-line"></div>
														<div className="order-total-dt">
															<div className="order-text">Total Amount</div>
															<div className="order-number">₹{transaction.purchase?.totalAmount}</div>
														</div>
													</div>
												</div>
											</div>
										</>
									) : (
										<div className="booking-confirmed-top text-center">
											<div className="booking-confirmed-img mt-4">
												<img src="/images/failed.svg" alt="" />
											</div>
											<h4>Payment Failed</h4>
											<p>{transaction?.message || 'Something went wrong'}</p>
											<div className="confirmation-btn">
												<button 
													className="main-btn btn-hover h_50 w-100 mt-5"
													onClick={() => router.back()}
												>
													Try Again
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
