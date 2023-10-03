import React from 'react'

export const useEffectOnce = (effect: React.EffectCallback) => {
  const ref = React.useRef(false)

  React.useEffect(() => {
    if (ref.current) return
    ref.current = true

    return effect()
  }, [])
}
