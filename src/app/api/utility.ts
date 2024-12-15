import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { TOKEN_COOKIE_NAME } from "./constants";
import cloudinary from '@/lib/cloudinary';
import QRCode from 'qrcode';

export function getUserIdFromToken(req: NextRequest) {
	const authToken = req.cookies.get(TOKEN_COOKIE_NAME);
	if (!authToken) {
		return null;
	}
	const decoded = jwt.verify(authToken.value, process.env.JWT_SECRET!) as { id: string };
	return decoded.id;
}

export async function generateQRCode(data: string): Promise<string> {
	try {
		// Generate QR code as buffer
		const buffer = await QRCode.toBuffer(data, {
			width: 300,
			margin: 2,
		});

		// Upload to Cloudinary
		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${buffer.toString('base64')}`,
			{
				folder: 'qrcodes',
				public_id: `qr-${data}`,
				resource_type: 'image'
			}
		);

		return result.secure_url;
	} catch (error) {
		console.error('Error generating QR code:', error);
		throw error;
	}
}