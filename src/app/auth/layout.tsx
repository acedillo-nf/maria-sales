import Image from 'next/image'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        <Image
          src="/images/logo-netfy2.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '20%',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        <div className="w-full mt-6 flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          ¡Hola, soy tu asistente con IA, mi nombre es MarIA!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          MarIA es capaz de capturar información de tus leads sin necesidad de un formulario...{' '}
          <br />
          algo totalmente nuevo 😉 (Bienes Raíces, Venta al por Menor, Logística, Doctores, Tecnología)
        </p>
        <Image
          src="/images/login-maria.jpeg"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 !w-full top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  )
}

export default Layout