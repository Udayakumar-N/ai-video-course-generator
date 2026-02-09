"use client"
import React from 'react'
import Image from 'next/image'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

function Header() {
  const { user } = useUser();

  return (
    <div className='flex justify-between items-center p-5 px-10 shadow-sm'>
      {/* 1. Logo Section */}
      <div className='flex gap-2 items-center'>
          <Image src={'/logo.png'} alt='logo' width={45} height={45}/>
          <h2 className='text-xl font-bold'><span className='text-primary'>Vid</span>Course</h2>
      </div>

      {/* 2. Navigation Section (The "Where" part!) */}
      <ul className='flex gap-10 items-center'>
        <li className='text-lg hover:text-primary font-medium cursor-pointer transition-all'>Home</li>
        <li className='text-lg hover:text-primary font-medium cursor-pointer transition-all'>Pricing</li>
      </ul>

      {/* 3. Auth Section */}
      <div className='flex items-center gap-4'>
        {user ?
          <UserButton afterSignOutUrl="/"/> :
          <SignInButton mode='modal'>
              <Button>Get Started</Button>
          </SignInButton>
        } 
      </div>
    </div>
  )
}

export default Header