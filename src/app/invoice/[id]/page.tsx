'use client'

import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { fetchPurchase } from '@/app/apis';
import { useUser } from '@/context/UserContext';
import { getDateObj } from '@/util/date';
import Link from 'next/link';
import InvoiceSkeleton from '@/components/invoice/skeleton';
import Image from 'next/image';

export default function Invoice() {
	const pathname = usePathname();
	const { user } = useUser();	
	const [purchase, setPurchase] = useState<PurchaseType | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const id = pathname.split('/')[2];
		setLoading(true);
		fetchPurchase(id)
			.then((purchase: PurchaseType) => {
				setPurchase(purchase)
			})
			.finally(() => {
				setLoading(false);
			});
	}, [pathname])
	
	const handleDownload = async () => {
		const element = document.querySelector('.invoice-body');
		if (!element) return;

		try {
			const images = element.getElementsByTagName('img');
			await Promise.all(Array.from(images).map(img => {
				if (img.complete) return Promise.resolve();
				return new Promise(resolve => {
					img.onload = resolve;
					img.onerror = resolve;
				});
			}));

			const barcodeImg = element.querySelector('.barcode-container img');
			if (barcodeImg) {
				await new Promise((resolve) => {
					if ((barcodeImg as HTMLImageElement).complete) resolve(true);
					(barcodeImg as HTMLImageElement).onload = () => resolve(true);
					(barcodeImg as HTMLImageElement).onerror = () => resolve(true);
				});
			}

			const pdfWidth = 800;
			const pdfHeight = (element.scrollHeight * pdfWidth) / element.scrollWidth;

			const canvas = await html2canvas(element as HTMLElement, {
					useCORS: true,
					allowTaint: true,
					logging: true,
					imageTimeout: 30000,
					scale: 3,
					width: pdfWidth,
					height: pdfHeight,
					windowWidth: pdfWidth,
					onclone: (clonedDoc) => {
						const clonedImages = clonedDoc.getElementsByTagName('img');
						Array.from(clonedImages).forEach(img => {
							img.style.maxHeight = 'none';
						});

						const clonedBarcode = clonedDoc.querySelector('.barcode-container img');
						if (clonedBarcode) {
							(clonedBarcode as HTMLElement).style.width = '260px';
							(clonedBarcode as HTMLElement).style.height = '120px';
							(clonedBarcode as HTMLElement).style.objectFit = 'contain';
						}
					}
				});

			const imgData = canvas.toDataURL('image/png');
			
			const pdf = new jsPDF({
				orientation: 'portrait',
					unit: 'px',
					format: [pdfWidth, pdfHeight]
				});
			
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
			pdf.save(`ticket-${purchase?.id}.pdf`);
		} catch (error) {
			console.error('Error generating PDF:', error);
		}
	};
	
	if (loading) {
		return <InvoiceSkeleton />;
	}
	
	return (
		<div className="invoice clearfix">
			<div className="container">
				<div className="row justify-content-md-center">
					<div className="col-lg-8 col-md-10">
						<div className="invoice-header justify-content-between">
							<div className="invoice-header-logo">
								<img src="/images/dark-logo.svg" alt="invoice-logo" />
							</div>
							<div className="invoice-header-text">
								<button 
									onClick={handleDownload} 
									className="download-link"
									style={{ border: 'none', background: 'none', cursor: 'pointer' }}
								>
									Download
								</button>
							</div>
						</div>
						<div className="invoice-body">
							<div className="invoice_dts">
								<div className="row">
									<div className="col-md-12">
										<h2 className="invoice_title">Invoice</h2>
									</div>
									<div className="col-md-6">
										<div className="vhls140">
											<ul>
												<li><div className="vdt-list">Invoice to {user?.firstName} {user?.lastName}</div></li>
												<li><div className="vdt-list">{user?.email}</div></li>
												{/* <li><div className="vdt-list">Melbourne, Victoria</div></li>
												<li><div className="vdt-list">3000, Australia</div></li> */}
											</ul>
										</div>
									</div>
									<div className="col-md-6">
										<div className="vhls140">
											<ul>
												<li><div className="vdt-list">Invoice ID : {purchase?.id}</div></li>
												<li><div className="vdt-list">Order Date : {getDateObj(purchase?.purchaseDate!).toLocaleDateString()}</div></li>
												{/* <li><div className="vdt-list">Near MBD Mall,</div></li> */}
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="main-table bt_40">
								<div className="table-responsive">
									<table className="table">
										<thead className="thead-dark">
											<tr>
												<th scope="col">#</th>
												<th scope="col">Event Details</th>
												<th scope="col">Type</th>
												<th scope="col">Qty</th>
												{!purchase?.event.isFreeEvent && <>
													<th scope="col">Unit Price</th>
													<th scope="col">Total</th>
												</>}
											</tr>
										</thead>
										<tbody>
											<tr>										
												<td>1</td>	
												<td><Link href={`/events/${purchase?.eventId}`} target="_blank">{purchase?.event.name}</Link></td>	
												<td>{purchase?.event.type}</td>	
												<td>{purchase?.tickets}</td>
												{!purchase?.event.isFreeEvent && <>
													<td>${purchase?.totalAmount! / purchase?.tickets!}</td>
													<td>${purchase?.totalAmount}</td>
												</>}
											</tr>
											{!purchase?.event.isFreeEvent && <tr>
												<td colSpan={1}></td>
												<td colSpan={5}>
													<div className="user_dt_trans text-end pe-xl-4">
														<div className="totalinv2">Invoice Total : {`${purchase?.event.locale} ${purchase?.totalAmount}`}</div>
														<p>Paid via PhonePe</p>
													</div>
												</td>
											</tr>}
										</tbody>									
									</table>
								</div>
							</div>
							{purchase?.event.type === 'venue' && (
								<div className="invoice_footer">
									<div className="cut-line" style={{ 
										position: 'relative',
										margin: '30px 0',
										borderTop: '2px dashed #ccc',
										textAlign: 'center'
									}}>
										<i 
											className="fa-solid fa-scissors" 
											style={{
												position: 'absolute',
												top: '-12px',
												left: '50%',
												transform: 'translateX(-50%)',
												background: '#fff',
												padding: '0 15px'
											}}
										/>
									</div>
									<div className="main-card">
										<div className="row g-0">
											<div className="col-lg-7">
												<div className="event-order-dt p-4">
													<div className="event-thumbnail-img">
														<img src={purchase?.event.image} alt="" />
													</div>
													<div className="event-order-dt-content">
														<h5>{purchase?.event.name}</h5>
														<span>{getDateObj(purchase?.event.date!).toLocaleDateString()}</span>
														<div className="buyer-name">{user?.firstName} {user?.lastName}</div>
														<div className="booking-total-tickets">
															<i className="fa-solid fa-ticket rotate-icon"></i>
															<span className="booking-count-tickets mx-2">{purchase?.tickets}</span>x Ticket
														</div>
														{!purchase?.event.isFreeEvent && <div className="booking-total-grand">
															Total : <span>${purchase?.totalAmount}</span>
														</div>}
													</div>
												</div>
											</div>
											<div className="col-lg-5">
												<div className="QR-dt p-4">
													<ul className="QR-counter-type">
														<li>{purchase?.event.type}</li>
														<li>{purchase?.id}</li>
													</ul>
													<div className="barcode-container" style={{ 
														width: '100%',
														maxWidth: '300px',
														height: '150px',
														margin: '20px auto',
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														backgroundColor: '#ffffff',
														padding: '15px',
														position: 'relative',
														zIndex: 1,
														boxSizing: 'border-box',
														border: '1px solid #eee'
													}}>
														<img 
															src={purchase?.barcode} 
															alt="Barcode" 
															style={{ 
																width: '260px',
																height: '120px',
																objectFit: 'contain',
																imageRendering: 'pixelated',
																position: 'relative',
																zIndex: 2,
																margin: '0 auto'
															}} 
															crossOrigin="anonymous"
														/>
													</div>
													<p>Powered by Barren</p>
												</div>
											</div>
										</div>
									</div>
									<div className="cut-line" style={{ 
										position: 'relative',
										margin: '30px 0',
										borderTop: '2px dashed #ccc',
										textAlign: 'center'
									}}>
										<i 
											className="fa-solid fa-scissors" 
											style={{
												position: 'absolute',
												top: '-12px',
												left: '50%',
												transform: 'translateX(-50%)',
												background: '#fff',
												padding: '0 15px'
											}}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
