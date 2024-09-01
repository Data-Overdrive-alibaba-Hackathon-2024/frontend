'use server'

// import { signIn } from '@/auth'
import { ResultCode, getStringFromBuffer } from '@/lib/utils'
import { z } from 'zod'
import { kv } from '@vercel/kv'
// import { getUser } from '../login/actions'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

// export async function createUser(
//   email: string,
//   hashedPassword: string,
//   salt: string
// ) {
//   const existingUser = await getUser(email)

//   if (existingUser) {
//     return {
//       type: 'error',
//       resultCode: ResultCode.UserAlreadyExists
//     }
//   } else {
//     const user = {
//       id: crypto.randomUUID(),
//       email,
//       password: hashedPassword,
//       salt
//     }
//     console.log("masuk sini 1 ID: ", user.id)

//     await kv.hmset(`user:${email}`, user)

//     return {
//       type: 'success',
//       resultCode: ResultCode.UserCreated
//     }
//   }
// }

// interface Result {
//   type: string
//   resultCode: ResultCode
// }

// export async function signup(
//   _prevState: Result | undefined,
//   formData: FormData
// ): Promise<Result | undefined> {
//   const email = formData.get('email') as string
//   const password = formData.get('password') as string

//   const parsedCredentials = z
//     .object({
//       email: z.string().email(),
//       password: z.string().min(6)
//     })
//     .safeParse({
//       email,
//       password
//     })

//   if (parsedCredentials.success) {
//     const salt = crypto.randomUUID()

//     const encoder = new TextEncoder()
//     const saltedPassword = encoder.encode(password + salt)
//     const hashedPasswordBuffer = await crypto.subtle.digest(
//       'SHA-256',
//       saltedPassword
//     )
//     const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

//     try {
//       const result = await createUser(email, hashedPassword, salt)
//       console.log("result: ")

//       if (result.resultCode === ResultCode.UserCreated) {
//         await signIn('credentials', {
//           email,
//           password,
//           redirect: false
//         })
//       }

//       return result
//     } catch (error) {
//       if (error instanceof AuthError) {
//         switch (error.type) {
//           case 'CredentialsSignin':
//             return {
//               type: 'error',
//               resultCode: ResultCode.InvalidCredentials
//             }
//           default:
//             return {
//               type: 'error',
//               resultCode: ResultCode.UnknownError
//             }
//         }
//       } else {
//         return {
//           type: 'error',
//           resultCode: ResultCode.UnknownError
//         }
//       }
//     }
//   } else {
//     return {
//       type: 'error',
//       resultCode: ResultCode.InvalidCredentials
//     }
//   }
// }

// Define the schema for validation using zod
interface SignupResult {
  type: 'success' | 'error'
  resultCode: string
}

export async function signup(prevState: SignupResult | undefined, formData: FormData): Promise<SignupResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { type: 'error', resultCode: 'INVALID_INPUT' }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Signup failed')
    }

    const data = await response.json()

    return { type: 'success', resultCode: 'SIGNUP_SUCCESS' }
  } catch (error) {
    console.error('Signup error:', error)
    return { type: 'error', resultCode: 'SIGNUP_FAILED' }
  }
}

