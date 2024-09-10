import { animate, motion } from 'framer-motion'
import React from 'react'

type Props = {}

const stairsAnimation = {
    initial: {
        top: '0%',
    },
    animate: {
        top: '100%'
    },
    exit: {
        top: ['100%', '0%']
    }
}

const reverseIndex = (index: any) => {
  const totalSteps = 6
  return totalSteps - index - 1;
}

const Stairs = (props: Props) => {
  return (
    <>
    {[...Array(6)].map((_, index) => {
        return (
            <motion.div 
        key={index}
        variants={stairsAnimation}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
            duration: 0.4,
            ease: 'easeInOut',
            delay: reverseIndex(index) * 0.1,
        }}
        className=' h-full w-full bg-primary relative'
        />
        )
    })}
    </>
  )
}

export default Stairs