'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { usePathname } from 'next/navigation'
import Stairs from './Stairs'


type Props = {}

const PageTransition = ({children}: any) => {
  const pathname = usePathname()
  
  return (
   
   <AnimatePresence mode='wait'>
    <div style={{ background: '' }}>
      <motion.div
        className="base-page-size"
        style={{
          overflow: 'hidden'
        }}
        key={pathname}
        initial={{
          opacity: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        animate={{
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
        }}
        transition={{
          duration: 1.5
        }}
        exit={{
          clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
        }}
      >
        {children}
      </motion.div>
    </div>
  </AnimatePresence>
   
  )
}

export default PageTransition