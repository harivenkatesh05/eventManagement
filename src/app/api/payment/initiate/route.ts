import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '../../utility';
import sha256 from 'sha256';
import axios from 'axios';
import Purchase from '@/models/Purchase';
import { store } from '@/lib/store';
import connectDatabase from '@/lib/mongodb';

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();
		const userId = getUserIdFromToken(request)!;
		const user = await store.getUserByID(userId)!
		
		// PhonePe integration configuration
		const payEndpoint = process.env.PHONEPE_PAY_ENDPOINT;
		const merchantId = process.env.PHONEPE_MERCHANT_ID;
		const saltKey = process.env.PHONEPE_SALT_KEY;
		const saltIndex = process.env.PHONEPE_SALT_INDEX;

		if (!payEndpoint || !merchantId || !saltKey || !saltIndex) {
			console.error('Missing PhonePe configuration');
			return NextResponse.json(
				{ error: 'Payment service configuration error' },
				{ status: 500 }
			);
		}

		await connectDatabase();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const purchaseObj: any = {
			eventId: data.eventId,
			userId,
			tickets: data.tickets,
			totalAmount: data.amount,
			status: 'pending',
			purchaseDate: new Date(),
			firstName: data.customerDetails.firstName,
			lastName: data.customerDetails.lastName,
			phoneNumber: data.customerDetails.phone
			// barcode will be auto-generated
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		data.ticketID && (purchaseObj.ticketID = data.ticketID)

		const purchase = new Purchase(purchaseObj);
		await purchase.save();

		const uniqueId = purchase._id.toString();

		// Create PhonePe payment request
		const paymentRequest = {
			merchantId,
			merchantTransactionId: uniqueId,
			amount: data.amount * 100, // Convert to paise
			redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback/${uniqueId}`,
			redirectMode: "REDIRECT",
			merchantUserId: userId,
			mobileNumber: user.phoneNumber,
			// deviceContext: {
			// 	deviceOS: "WEB"
			// },
			paymentInstrument: {
				type: "PAY_PAGE"
			}
		};

		console.log("Payment Request:", paymentRequest);

		const bufferObj = Buffer.from(JSON.stringify(paymentRequest));
		const base64Payload = bufferObj.toString('base64');
		
		const xverify = sha256(base64Payload + payEndpoint + saltKey) + "###" + saltIndex;

		try {
			const response = await axios({
				method: 'POST',
				url: `${process.env.PHONEPE_BASE_URL}${payEndpoint}`,
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
					'X-VERIFY': xverify
				},
				data: {
					request: base64Payload
				}
			});

			console.log("PhonePe Response:", response.data);

			if (!response.data?.data?.instrumentResponse?.redirectInfo?.url) {
				throw new Error('Invalid response from payment gateway');
			}

			return NextResponse.json({
				redirectUrl: response.data.data.instrumentResponse.redirectInfo.url
			});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (axiosError: any) {
			console.error('PhonePe API Error:', axiosError.response?.data || axiosError.message);
			return NextResponse.json({
				error: axiosError.response?.data?.message || 'Payment initiation failed'
			}, { status: axiosError.response?.status || 500 });
		}

	} catch (error) {
		console.error('Payment initiation error:', error);
		return NextResponse.json(
			{ error: 'Payment initiation failed' },
			{ status: 500 }
		);
	}
} 