import { FC } from 'react'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10"/>
    <path d="M30 50L45 65L70 35" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default Logo

