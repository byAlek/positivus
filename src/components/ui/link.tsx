import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'preact'
import { buttonVariants, icon } from './button'

export const Link = ({
  className,
  variant,
  color,
  iconColor,
  children,
  ...props
}: VariantProps<typeof buttonVariants> & ComponentProps<'a'>) => {
  return (
    <a className={cn(buttonVariants({ color, iconColor, variant, className }))} {...props}>
      {icon[variant as keyof typeof icon]}
      {children}
    </a>
  )
}
