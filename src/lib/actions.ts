'use server';

import { z } from 'zod';

const CreatePixPaymentInputSchema = z.object({
  amount: z.number().describe('The payment amount in BRL.'),
  payerName: z.string().describe("The payer's name."),
});
export type CreatePixPaymentInput = z.infer<typeof CreatePixPaymentInputSchema>;

const CreatePixPaymentOutputSchema = z.object({
  transactionId: z.string().describe('The Pushinpay transaction ID.'),
  qrCode: z.string().describe('Base64 encoded QR code image.'),
  pixCopyPaste: z.string().describe('The PIX copy and paste code.'),
});
export type CreatePixPaymentOutput = z.infer<typeof CreatePixPaymentOutputSchema>;

export async function createPixPayment(input: CreatePixPaymentInput): Promise<CreatePixPaymentOutput> {
    const apiKey = process.env.PUSHINPAY_API_KEY;
    if (!apiKey) {
      throw new Error('Pushinpay API key is not configured.');
    }

    console.log(`Creating PIX payment for ${input.payerName} with amount ${input.amount}`);

    const response = await fetch('https://api.pushinpay.com.br/api/pix/cashIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        value: Math.round(input.amount * 100), // Convert to cents
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Pushinpay API Error:', response.status, errorBody);
        throw new Error(`Failed to create PIX payment: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.id || !data.qr_code_base64 || !data.qr_code) {
        console.error('Pushinpay API returned an unexpected format:', data);
        throw new Error(`Pushinpay API returned an error: ${JSON.stringify(data)}`);
    }
    
    return {
      transactionId: data.id,
      qrCode: data.qr_code_base64, // This already includes the data URI prefix
      pixCopyPaste: data.qr_code,
    };
}


const CheckPixPaymentStatusOutputSchema = z.object({
  status: z.enum(['created', 'paid', 'expired', 'error']),
});
export type CheckPixPaymentStatusOutput = z.infer<typeof CheckPixPaymentStatusOutputSchema>;

export async function checkPixPaymentStatus(transactionId: string): Promise<CheckPixPaymentStatusOutput> {
  const apiKey = process.env.PUSHINPAY_API_KEY;
  if (!apiKey) {
    throw new Error('Pushinpay API key is not configured.');
  }

  try {
    const response = await fetch(`https://api.pushinpay.com.br/api/transactions/${transactionId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Transaction ${transactionId} not found.`);
        return { status: 'error' };
      }
      const errorBody = await response.text();
      console.error('Pushinpay API Error:', response.status, errorBody);
      throw new Error(`Failed to check PIX payment status: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.status) {
       return { status: data.status };
    } else {
       console.error('Unexpected response format from Pushinpay status check:', data);
       return { status: 'error' };
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    return { status: 'error' };
  }
}
