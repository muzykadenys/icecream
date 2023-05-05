import React, { useEffect, useRef } from 'react'
import '../src/index.css'
import { gsap } from 'gsap'
import { Line } from '@react-three/drei'

function Interface() {
  const svgRef = useRef()
  useEffect(()=>{
    if(svgRef.current){
      gsap.to(svgRef.current, {duration: 5 ,rotation: '360', repeat: -1 })
    }
  },[])

  return (
    <div className="InterfaceSection">

      <svg ref={svgRef} class="circles" width="100%" height="100%" viewBox="0 0 1400 1400">
        <path
          fill="none"
          id="circle-4"
          d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5"
        />
        <text class="circles__text circles__text--4">
          <textPath
            class="circles__text-path"
            href="#circle-4"
            aria-label=""
            textLength="836"
          >
            heeey boy check this icecream!
          </textPath>
        </text>
      </svg>
    </div>
  )
}

export default Interface
