'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'

type FormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        toast.error('Invalid email or password')
      } else {
        toast.success('Logged in successfully')
        router.push('/dashboard') // Redirect to dashboard or home page
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Ingresa tu email para iniciar sesión en tu cuenta.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" {...register("password", { required: true })} />
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-nmarino hover:bg-nblue text-white" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Iniciar Sesión'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
