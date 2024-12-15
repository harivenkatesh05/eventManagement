import { generateQRCode } from '@/app/api/utility';
import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
	eventId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	tickets: {
		type: Number,
		required: true,
		min: 1
	},
	totalAmount: {
		type: Number,
		required: true
	},
	purchaseDate: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed', 'cancelled'],
		default: 'pending'
	},
	barcode: {
		type: String,
		unique: true,
	}
});

// Generate and upload barcode after saving
purchaseSchema.post('save', async function(doc) {
	if (!doc.barcode) {
		const timestamp = Date.now().toString(36);
		const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
		const barcodeText = `EVENT-${doc.eventId.toString().slice(-4)}-${timestamp}-${random}`;
		
		try {
			doc.barcode = await generateQRCode(barcodeText);
			await doc.save();
		} catch (error) {
			console.error('Error generating barcode:', error);
		}
	}
});

const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);

export default Purchase; 