'use client'

import { useEffect, useState } from 'react'
import { detectDevice, type DeviceType } from '@/lib/device'

export function useDevice() {
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const update = () => {
      setDevice(
        detectDevice(
          window.innerWidth,
          navigator.userAgent,
          navigator.maxTouchPoints
        )
      )
      setIsReady(true)
    }

    update()

    const mediaQuery = window.matchMedia('(max-width: 767px)')
    mediaQuery.addEventListener('change', update)
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('orientationchange', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return {
    device,
    isReady,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  }
}
