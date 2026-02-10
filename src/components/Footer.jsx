import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
import {Logo, Logomark} from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import qrCode from '@/images/qr-code.svg'

function QrCodeBorder(props) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pt-12 pb-6 sm:pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              {/*<Logomark className="h-10 w-10 flex-none fill-violet-500" />*/}
              <Logo className="h-10 w-auto" />
              {/*<div className="ml-4">*/}
              {/*  <p className="text-base font-semibold">Pocket</p>*/}
              {/*  <p className="mt-1 text-sm">Invest at the perfect time.</p>*/}
              {/*</div>*/}
            </div>
            <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 sm:mt-11">
              <NavLinks />
            </nav>
          </div>
          <div className="flex w-full sm:w-auto">
            <Link
              href="#"
              className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              App herunterladen
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 border-t border-gray-200 pt-8 pb-12 text-center md:flex-row-reverse md:justify-between md:pt-6 md:text-left">
          {/*<form className="flex w-full justify-center md:w-auto">*/}
          {/*  <TextField*/}
          {/*    type="email"*/}
          {/*    aria-label="Email address"*/}
          {/*    placeholder="Email address"*/}
          {/*    autoComplete="email"*/}
          {/*    required*/}
          {/*    className="w-60 min-w-0 shrink"*/}
          {/*  />*/}
          {/*  <Button type="submit" color="violet" className="ml-4 flex-none">*/}
          {/*    <span className="hidden lg:inline">Join our newsletter</span>*/}
          {/*    <span className="lg:hidden">Join newsletter</span>*/}
          {/*  </Button>*/}
          {/*</form>*/}
          <a className="text-sm px-4 py-2 rounded-xl bg-gray-200 text-gray-600 hover:text-gray-800" href="https://www.fiverr.com/nicksalooniya?public_mode=true" target="_blank" rel="noopener noreferrer">
            Made by Nick
          </a>
          <p className="text-sm text-gray-500">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
