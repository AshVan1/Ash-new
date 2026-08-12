'use client'

import { useSyncExternalStore } from 'react'
import { detectDevice, type DeviceType } from '@/lib/device'

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(max-width: 767px)')
  mediaQuery.addEventListener('change', onStoreChange)
  window.addEventListener('resize', onStoreChange, { passive: true })
  window.addEventListener('orientationchange', onStoreChange)

  return () => {
    mediaQuery.removeEventListener('change', onStoreChange)
    window.removeEventListener('resize', onStoreChange)
    window.removeEventListener('orientationchange', onStoreChange)
  }
}

function getDeviceSnapshot(): DeviceType {
  return detectDevice(
    window.innerWidth,
    navigator.userAgent,
    navigator.maxTouchPoints
  )
}

function getServerDeviceSnapshot(): DeviceType {
  return 'mobile'
}

export function useDevice() {
  const device = useSyncExternalStore(
    subscribe,
    getDeviceSnapshot,
    getServerDeviceSnapshot
  )

  return {
    device,
    isReady: true,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  }
}
