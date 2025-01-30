// components/Header.tsx
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="body-font fixed z-20 w-full bg-white text-gray-900 shadow">
      <div className="absolute inset-0 w-96 flex items-center justify-center mx-auto">
      </div>
      <div className="container mx-auto flex flex-col flex-wrap items-center p-2 px-6 md:flex-row">
        <Link href="/" className="flex">
          <span className="title-font flex cursor-pointer items-center font-medium text-gray-900 md:mb-0">
            <img
              src="/logo-full.png"
              alt="OpenSecurity Logo"
              width={150}
              height={40}
            />
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <Link href="https://discord.gg/Ma9UZNBxvh">
            <div className="mr-5 flex items-center hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.0}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
