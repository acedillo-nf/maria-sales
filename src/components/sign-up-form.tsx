'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import { toast } from 'react-hot-toast'; // Make sure you have react-hot-toast installed

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created successfully');
        router.push('/auth/signin');
      } else {
        toast.error(result.message || 'Error creating account');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-nmarino">Crea tu cuenta</CardTitle>
        <CardDescription className="text-center">
          Crea tu cuenta para empezar a usar MarIA
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" type="text" placeholder="John Doe" {...register("name", { required: true })} />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@ejemplo.com" {...register("email", { required: true })} />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" {...register("password", { required: true })} />
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <Input id="confirm-password" type="password" {...register("confirmPassword", { required: true })} />
            {errors.confirmPassword && <span className="text-red-500">This field is required</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-nmarino hover:bg-nblue text-white" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Crear Cuenta'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}