export type DeviceType = 'mobile' | 'tablet' | 'desktop'

const MOBILE_UA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i
const TABLET_UA = /iPad|Tablet|PlayBook|Silk/i

export function detectDevice(width: number, userAgent: string, maxTouchPoints = 0): DeviceType {
  const isMobileUA = MOBILE_UA.test(userAgent)
  const isTabletUA =
    TABLET_UA.test(userAgent) ||
    (maxTouchPoints > 1 && width >= 768 && width < 1024)

  if (width < 768 || (isMobileUA && !isTabletUA)) {
    return 'mobile'
  }

  if (isTabletUA || width < 1024) {
    return 'tablet'
  }

  return 'desktop'
}

export function isMobileDevice(width: number, userAgent: string, maxTouchPoints = 0): boolean {
  return detectDevice(width, userAgent, maxTouchPoints) === 'mobile'
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
