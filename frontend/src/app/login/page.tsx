// pages/login.tsx (or app/login/page.tsx)

"use client" // Mark this component as a client-side component

import React, { useState } from 'react'
import { useRouter } from 'next/navigation' // For navigation

const LoginPage: React.FC = () => {
  // State for email and password
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // State for handling form errors
  const [error, setError] = useState<string>('')

  // Next.js router for redirection
  const router = useRouter()

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email and password
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!password) {
      setError('Please enter your password')
      return
    }

    // Simulate a login request (replace with actual API call)
    if (email === 'user@example.com' && password === 'password123') {
      // Successful login, redirect to dashboard (or another page)
      router.push('/dashboard') // Example route after login
    } else {
      setError('Invalid credentials, please try again')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1>Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Combined Email and Password Forms */}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0070f3', color: 'white' }}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
