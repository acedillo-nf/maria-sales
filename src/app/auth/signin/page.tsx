'use client'

import React from 'react'
import { LoginForm } from '@/components/authentication-01'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SignInPage = () => {
  return (
    <>
      <LoginForm />
      <div className="mt-4 text-center">
        <p>¿No tienes una cuenta?</p>
        <Link href="/auth/sign-up">
          <Button className="bg-nmarino hover:bg-nblue text-white">Registrarse</Button>
        </Link>
      </div>
    </>
  )
}

export default SignInPage