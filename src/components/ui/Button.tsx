import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-gradient-brand text-white hover:opacity-90",
        secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
        outline: "border border-border hover:bg-secondary/10",
        ghost: "text-foreground hover:bg-secondary/10",
        link: "text-primary underline-offset-4 hover:underline",
        youtube: "bg-red-600 text-white hover:bg-red-700",
        spotify: "bg-green-600 text-white hover:bg-green-700",
        apple: "bg-gray-800 text-white hover:bg-gray-900",
      },
      size: {
        xs: "text-xs px-2.5 py-1.5",
        sm: "text-sm px-3 py-2",
        md: "text-sm px-4 py-2.5",
        lg: "text-base px-5 py-3",
        xl: "text-lg px-6 py-3.5",
      },
      fullWidth: {
        true: "w-full",
      },
      withIcon: {
        true: "space-x-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      withIcon: false,
    },
  }
);

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  disabled?: boolean;
}

interface ButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled'> {
  href?: undefined;
  children: React.ReactNode;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

type Props = ButtonProps | LinkButtonProps;

export function Button({ children, className = "", variant, size, fullWidth, withIcon, disabled, ...props }: Props) {
  const buttonClasses = buttonVariants({ variant, size, fullWidth, withIcon, className });

  if ('href' in props) {
    const { href, external, ...rest } = props as LinkButtonProps;
    
    if (external) {
      return (
        <a 
          href={href} 
          className={buttonClasses} 
          target="_blank" 
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={buttonClasses} {...rest}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type="button" 
      className={buttonClasses} 
      disabled={disabled} 
      {...props as ButtonProps}
    >
      {children}
    </button>
  );
}

export default Button; 