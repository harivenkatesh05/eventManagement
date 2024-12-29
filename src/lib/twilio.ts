import twilio from 'twilio';

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendOTP = async (phoneNumber: string) => {
    try {
        const verification = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
            .verifications.create({
                to: `+91 ${phoneNumber}`,
                channel: 'sms'
            });
        return verification.status;
    } catch (error) {
        console.error('Error sending OTP:', error);
        // throw new Error('Failed to send OTP');
    }
};

export const verifyOTP = async (phoneNumber: string, code: string) => {
    try {
        const verification = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
            .verificationChecks.create({
                to: `+91 ${phoneNumber}`,
                code
            });
        return verification.status === 'approved';
    } catch (error) {
        console.error('Error verifying OTP:', error);
    }
}; 