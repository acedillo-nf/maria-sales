"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface UserData {
  name: string
  email: string
}

export function AccountContent() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated' && session?.user) {
        try {
          const response = await fetch('/api/user')
          if (!response.ok) {
            throw new Error('Failed to fetch user data')
          }
          const data = await response.json()
          setUserData(data)
        } catch (err) {
          setError('Error fetching user data')
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      } else if (status === 'unauthenticated') {
        setError('User not authenticated')
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [status, session])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!userData) {
    return <div>No user data available</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={userData.name} 
            readOnly 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={userData.email} 
            readOnly 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
          />
        </div>
      </div>
    </div>
  )
}