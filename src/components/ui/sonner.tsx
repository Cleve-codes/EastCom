"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      theme="dark"
      icons={{
        success: <CircleCheckIcon className="size-5 text-primary" />,
        info: <InfoIcon className="size-5 text-primary" />,
        warning: <TriangleAlertIcon className="size-5 text-yellow-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={{
        "--normal-bg": "#0A0E1A",
        "--normal-text": "#ffffff",
        "--normal-border": "rgba(255,255,255,0.1)",
        "--normal-icon": "#F5A623",
        "--success-bg": "#0A0E1A",
        "--success-text": "#ffffff",
        "--success-border": "rgba(245,166,35,0.3)",
        "--success-icon": "#F5A623",
        "--error-bg": "#0A0E1A",
        "--error-text": "#ffffff",
        "--error-border": "rgba(239,68,68,0.3)",
        "--error-icon": "#ef4444",
        "--warning-bg": "#0A0E1A",
        "--warning-text": "#ffffff",
        "--warning-border": "rgba(251,191,36,0.3)",
        "--warning-icon": "#fbbf24",
        "--info-bg": "#0A0E1A",
        "--info-text": "#ffffff",
        "--info-border": "rgba(245,166,35,0.3)",
        "--info-icon": "#F5A623",
        "--invert-bg": "#ffffff",
        "--invert-text": "#0A0E1A",
        "--invert-icon": "#0A0E1A",
        "--border-radius": "16px",
        "--padding": "16px",
      } as React.CSSProperties}
      toastOptions={{
        style: {
          background: '#0A0E1A',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#ffffff',
          borderRadius: '16px',
        },
        classNames: {
          toast: 'bg-[#0A0E1A] border border-white/10 text-white',
          success: 'border-primary/30',
          error: 'border-red-500/30',
          warning: 'border-yellow-500/30',
          info: 'border-primary/30',
          icon: 'text-primary',
          title: 'text-white font-semibold',
          description: 'text-white/70',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
