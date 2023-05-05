import {
  BBAnchor,
  Float,
  Html,
  OrbitControls,
  ScrollControls,
  useGLTF,
  useScroll,
  useTexture,
} from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import Interface from './Interface'
import { gsap } from 'gsap'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import MixInterface from './MixInterface'

function App() {
  // const { focusDistance, focalLength, bokehScale } = useControls({
  //   focusDistance: {
  //     min: 0,
  //     max: 4,
  //     value: 2,
  //   },
  //   focalLength: {
  //     min: 0,
  //     max: 1,
  //     value: 0.1,
  //   },
  //   bokehScale: {
  //     min: 0,
  //     max: 10,
  //     value: 2,
  //   },
  // })

  return (
    <>
      <Interface />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, -3.2, 40], fov: 12 }}
        color="pink"
      >
        {/* <Perf /> */}
        <fog attach="fog" args={['#f63838', 25, 70]} />

        <Html fullscreen>
          <MixInterface />
        </Html>

        {/* <OrbitControls /> */}
        <ScrollControls pages={2}>
          <Float speed={3}>
            <CloudIceCream />
          </Float>
        </ScrollControls>
      </Canvas>
    </>
  )
}

function CloudIceCream() {
  const { nodes, materials } = useGLTF('./models/ice_cream.glb')
  const matcap = useLoader(TextureLoader, '../matcaps/mat1.png')
  const { width, height } = useThree((state) => state.viewport)
  const amount = 20

  const [iceMaterial, setIceMaterial] = useState()

  return (
    <>
      <meshMatcapMaterial ref={setIceMaterial} matcap={matcap} />
      {Array(amount)
        .fill()
        .map((el, index) => {
          let x = (Math.random() - 0.5) * (width + width * 0.9)
          let y = index * (height / amount) - height / 2
          let z = -(Math.random() - 0.3) * 30
          // console.log(width)
          return (
            <IceCream
              key={index}
              position={[x, y, z]}
              nodes={nodes}
              material={iceMaterial}
            />
          )
        })}
    </>
  )
}

function IceCream({ position, nodes, material }) {
  const scroll = useScroll()
  const iceRef = useRef()
  const [randRotation] = useState(Math.random())
  const [originPos, setOriginPos] = useState(position)

  const svgEl = document.querySelector('.circles')

  useFrame((state, delta) => {
    const offset = scroll.offset

    if (offset <= 0.99) {
      svgEl.style.transition = ` scale ${offset}s ease-in-out;`
      svgEl.style.scale = 1 + offset * 3
    }

    document.body.style.background = `radial-gradient(circle, rgba(246, 56, 56, 1) ${
      20 + 50 * offset
    }%, #780404 ${100 + 40 * offset}%)`

    if (iceRef.current) {
      iceRef.current.position.set(
        Math.sin(offset) * originPos[0],
        Math.atan(offset * Math.PI * 2) * originPos[1],
        Math.sin(offset) * originPos[2],
      )
    }

    const angle = randRotation * offset
    iceRef.current.rotation.z = Math.sin(angle) + originPos[2] * offset
    iceRef.current.rotation.y = Math.cos(angle) * 0.2
  })

  return (
    <>
      <group
        ref={iceRef}
        scale={0.2}
        position={position}
        rotation={[-Math.PI * 0.3, 0, Math.PI * 0.6]}
      >
        <mesh geometry={nodes.Cube_Gold_Intens_0.geometry} material={material}>
          {/* <meshMatcapMaterial matcap={matcap} /> */}
        </mesh>
        <mesh geometry={nodes.Cube_Gold_0.geometry} material={material}>
          {/* <meshMatcapMaterial matcap={matcap} /> */}
        </mesh>
        <mesh geometry={nodes.Cube_ICE_0.geometry} material={material}>
          {/* <meshMatcapMaterial matcap={matcap} /> */}
        </mesh>
        <mesh geometry={nodes.Cube_WOOD_0.geometry} material={material}>
          {/* <meshMatcapMaterial matcap={matcap} /> */}
        </mesh>
      </group>
    </>
  )
}

export default App
