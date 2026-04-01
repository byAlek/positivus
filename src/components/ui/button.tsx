import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'preact'
import { Arrow } from '../icons/arrow'
import { ArrowBg } from '../icons/arrow-bg'

export const buttonVariants = cva(
  'focus-ring inline-flex cursor-pointer items-center justify-center gap-2 text-xl whitespace-nowrap transition-all hover:scale-105 hover:opacity-85 focus-visible:scale-102',
  {
    variants: {
      variant: {
        simple: 'ring-primary!',
        outline: 'border-2 bg-transparent!',
        ghost: 'bg-transparent!',
        'with-arrow': '[&_.icon]:order-last [&>.icon]:size-4.5',
        'with-arrow-2': '[&>.icon]:size-8',
        link: 'bg-transparent! p-1 font-medium hover:underline',
      },
      color: {
        primary: 'bg-primary-foreground text-primary',
        'primary-inverted': 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary-foreground text-secondary',
        'secondary-inverted': 'bg-secondary text-secondary-foreground',
        white: 'border-white bg-black text-white',
        black: 'border-black bg-white text-black',
      },
      iconColor: {
        primary: '[&>.icon]:text-primary [&>.icon]:fill-primary-foreground',
        'primary-inverted': '[&>.icon]:text-primary-foreground [&>.icon]:fill-primary',
        secondary: '[&>.icon]:text-secondary [&>.icon]:fill-secondary-foreground',
        'secondary-inverted': '[&>.icon]:text-secondary-foreground [&>.icon]:fill-secondary',
        white: '[&>.icon]:fill-black [&>.icon]:text-white',
        black: '[&>.icon]:fill-white [&>.icon]:text-black',
      },
    },
    compoundVariants: [
      {
        variant: ['ghost', 'outline'],
        class: 'hover:bg-foreground/10!',
      },
      {
        variant: ['with-arrow', 'with-arrow-2'],
        class: 'bg-transparent! px-2 py-1',
      },
      {
        variant: ['simple', 'outline', 'ghost'],
        class: 'h-17 min-w-31 px-8',
      },
    ],
    defaultVariants: {
      variant: 'simple',
      color: 'secondary',
    },
  }
)
export const icon = {
  'with-arrow': <Arrow className="icon" />,
  'with-arrow-2': <ArrowBg className="icon" />,
}
export const Button = ({
  className,
  variant,
  color,
  iconColor,
  children,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  return (
    <button
      className={cn(buttonVariants({ variant, color, iconColor, className }))}
      data-variant={variant}
      {...props}
    >
      {icon[variant as keyof typeof icon]}
      {children}
    </button>
  )
}
