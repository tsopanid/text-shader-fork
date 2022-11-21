import React, { forwardRef, useLayoutEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useLoader, extend } from '@react-three/fiber'
import { shaderMaterial, Text3D } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const Text = forwardRef(({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }, ref) => {
  // const font = useLoader(THREE.FontLoader, 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
  // const config = useMemo(() => ({ font, size: 40, height: 1 }), [font])
  const mesh = useRef()
  useLayoutEffect(() => {
    const size = new THREE.Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(size)
    mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
    mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
  }, [children])
  return (
    <group ref={ref} {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      {/* <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <modulationMaterial />
      </mesh> */}
      <Text3D ref={mesh} letterSpacing={-0.06} size={40} height={1} font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json">
        {/* <modulationMaterial /> */}
        {props.text}
      </Text3D>
    </group>
  )
})

export default Text
