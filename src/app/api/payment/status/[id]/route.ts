import { NextRequest, NextResponse } from 'next/server';
import Purchase from '@/models/Purchase';
import connectDatabase from '@/lib/mongodb';
import axios from 'axios';
import sha256 from 'sha256';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await Promise.resolve(params);
		await connectDatabase();

		// Check PhonePe status
		const merchantId = process.env.PHONEPE_MERCHANT_ID;
		const saltKey = process.env.PHONEPE_SALT_KEY;
		const saltIndex = process.env.PHONEPE_SALT_INDEX;

		const payloadString = `/pg/v1/status/${merchantId}/${id}`;
		const xverify = sha256(payloadString + saltKey) + "###" + saltIndex

		const response = await axios.get(
			`${process.env.PHONEPE_BASE_URL}/pg/v1/status/${merchantId}/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'X-VERIFY': xverify,
					'X-MERCHANT-ID': merchantId
				}
			}
		);

		if (response.data.code === 'PAYMENT_SUCCESS') {
			// Get purchase details
			const purchase = await Purchase.findOne({ transactionId: id })
				.populate('event', 'name image date type');

			if (!purchase) {
				return NextResponse.json({
					status: 'failure',
					message: 'Purchase details not found'
				});
			}

			return NextResponse.json({
				status: 'success',
				message: 'Payment successful',
				purchase: {
					id: purchase._id,
					eventId: purchase.eventId,
					event: purchase.event,
					tickets: purchase.tickets,
					totalAmount: purchase.totalAmount,
					barcode: purchase.barcode
				}
			});
		}

		return NextResponse.json({
			status: 'failure',
			message: 'Payment failed'
		});

	} catch (error) {
		console.error('Error checking payment status:', error);
		return NextResponse.json(
			{ 
				status: 'failure',
				message: 'Failed to verify payment status'
			},
			{ status: 500 }
		);
	}
} 