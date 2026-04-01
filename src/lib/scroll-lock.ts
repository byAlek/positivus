import { effect, signal } from '@preact/signals'

const overlayCount = signal<number>(0)

function lockScroll() {
  overlayCount.value++
}

function unlockScroll() {
  overlayCount.value = Math.max(0, overlayCount.value - 1)
}

function initScrollLock() {
  effect(() => {
    if (overlayCount.value > 0) {
      document.documentElement.classList.add('modal-open')
    } else {
      document.documentElement.classList.remove('modal-open')
    }
  })
}

export { initScrollLock, lockScroll, unlockScroll }
