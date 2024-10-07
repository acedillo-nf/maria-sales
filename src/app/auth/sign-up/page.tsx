'use client'

import React from 'react'
import { SignUpForm } from '@/components/sign-up-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <>
      <SignUpForm />
      <div className="mt-4 text-center">
        <p>¿Ya tienes una cuenta?</p>
        <Link href="/auth/signin">
          <Button className="bg-nmarino hover:bg-nblue text-white">Iniciar Sesión</Button>
        </Link>
      </div>
    </>
  )
}

export default SignUpPage