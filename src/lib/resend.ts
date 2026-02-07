import { Resend } from 'resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export const resend = new Resend(process.env.RESEND_API_KEY);
