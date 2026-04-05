'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { UserRole } from '@/lib/types/database'

export async function signUp(formData: FormData): Promise<{ error?: string } | void> {
  // Mock signup for UI prototype
  const role = (formData.get('role') as UserRole) || 'tenant'
  
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  console.log('Mock: User signed up with role', role)
  
  revalidatePath('/', 'layout')
  redirect(`/dashboard/${role}`)
}

export async function signIn(formData: FormData): Promise<{ error?: string } | void> {
  // Mock signin for UI prototype
  const email = formData.get('email') as string
  
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  console.log('Mock: User signed in', email)
  
  // Default to tenant for prototype
  revalidatePath('/', 'layout')
  redirect('/dashboard/tenant')
}

export async function signOut() {
  // Mock signout for UI prototype
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  console.log('Mock: User signed out')
  
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithMagicLink(email: string) {
  // Mock magic link for UI prototype
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  console.log('Mock: Magic link sent to', email)
  
  return { success: true }
}
