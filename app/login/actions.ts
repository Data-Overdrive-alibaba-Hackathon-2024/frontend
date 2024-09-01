'use server'

// import { signIn } from '@/auth'
import { User } from '@/lib/types'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { ResultCode } from '@/lib/utils'

export interface Result {
  type: 'success' | 'error';
  resultCode: string;
  message?: string;
  token?: string;
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login` as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.status === 'success') {
        return {
          type: 'success',
          resultCode: 'LOGIN_SUCCESS',
          message: data.message,
          token: data.token,
        };
      } else {
        return {
          type: 'error',
          resultCode: 'LOGIN_FAILED',
          message: data.message,
        };
      }
    } else {
      return {
        type: 'error',
        resultCode: 'LOGIN_FAILED',
        message: data.message || 'Login failed due to server error',
      };
    }
  } catch (error) {
    console.log('gagal')

    console.error('Authentication error:', error);
    return {
      type: 'error',
      resultCode: 'NETWORK_ERROR',
      message: 'Network error occurred while trying to log in',
    };
  }
}