'use client'
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Stairs from './Stairs'

type Props = {}

const StairsTransition = (props: Props) => {
    const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
        <div key={pathname}>
            <div className=" h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-100 flex ">
             <Stairs/>
            </div>
        </div>
    </AnimatePresence>
  )
}

export default StairsTransition