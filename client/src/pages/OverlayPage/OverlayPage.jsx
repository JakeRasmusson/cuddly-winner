import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground'

const OverlayPage = _ => {

    const [selectedOverlay, setSelectedOverlay] = useState(localStorage.getItem('selectedOverlay') || null)

    useEffect(_ => {
        const handleStorageChange = e => {
            setSelectedOverlay(e.newValue)
        }

        window.addEventListener('storage', handleStorageChange)
        return _ => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return (
        <>
            <div className='absolute left-0 top-0 w-screen h-screen'>
                <AnimatedBackground />
                <div className='absolute w-full h-full bg-[rgba(28,12,34,0.9)]'>

                    {
                        /* If there's no overlay, play the animation */
                        selectedOverlay == '' ? (
                            <motion.div
                                className="fixed inset-0 flex items-center justify-center"
                                initial={{ x: '-150%', rotate: -720}}
                                animate={{
                                    x: ["-150%", '0%', '0%', '150%'],
                                    rotate: [-720, 0, 0, 720]
                                }}
                                transition={{
                                    duration: 10,
                                    times: [0, 0.2, 0.8, 1],
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                            >
                                <img src="/easdlogo.png" alt="Elk" className="w-130 h-130 object-cover" />
                            </motion.div>
                        )

                        /* Display stats for team 1 */
                        : selectedOverlay == 'overall team 1' ? (
                            <h2 className='text-7xl'>{selectedOverlay}</h2>
                        )

                        /* Display stats for team 2*/
                        : selectedOverlay == 'overall team 2' ? (
                            <h2 className='text-7xl'>{selectedOverlay}</h2>
                        )

                        /* Somehow something ended up as the selected overlay that I didn't anticipate */
                        : (
                            <h2>Something went wrong</h2>
                        )
                    }
                </div>
            </div>
            
        </>
    )
}

export default OverlayPage