import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground'


const OverlayPage = _ => {

    const [ gameList, setGameList ] = useState(JSON.parse(localStorage.getItem('gameList')) || null)

    const [selectedOverlay, setSelectedOverlay] = useState(localStorage.getItem('selectedOverlay'))
    const [ gameID, setGameID ] = useState(localStorage.getItem('gameID') || null)

    useEffect(_ => {
        const storedGames = JSON.parse(localStorage.getItem('gameList'))
        if(storedGames) setGameList(storedGames)
    }, [])

    const game = gameList.find(g => g.id == gameID)

    useEffect(_ => {

        const handleStorageChange = e => {
            if(e.key == 'selectedOverlay'){
                setSelectedOverlay(e.newValue)
            }
            if(e.key == 'gameList'){
                setGameList(JSON.parse(e.newValue))
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return _ => window.removeEventListener('storage', handleStorageChange)

    }, [])
    

    const team1 = game?.team1
    const team2 = game?.team2

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
                                    repeatDelay: 1
                                }}
                            >
                                <img src="/easdlogo.png" alt="Elk" className="w-130 h-130 object-cover" />
                            </motion.div>
                        )

                        /* Display stats for team 1 */
                        : selectedOverlay == 'overall team 1' ? (
                            <h2 className='text-7xl'>{team1?.town}</h2>
                        )

                        /* Display stats for team 2*/
                        : selectedOverlay == 'overall team 2' ? (
                            <h2 className='text-7xl'>{team2?.town}</h2>
                        )

                        /* If players are provided, display their stats */
                        : selectedOverlay?.split(' ')[0] == 'playerid' ? (
                            <div className='flex items-center justify-center min-h-screen'>
                                <div className='flex justify-center w-full gap-4'>
                                    {
                                        selectedOverlay.split(' ').filter(e => e.match(/\d/g)).map(id => {
                                            const player = id.startsWith('home') 
                                                            ? team1.players.find(p => p.id === id)
                                                            : team2.players.find(p => p.id === id)

                                            const teamName = id.startsWith('home')
                                                              ? team1.town
                                                              : team2.town

                                            return (
                                                <div 
                                                    key={id}
                                                    className="p-4 rounded-xl shadow-md border-1 min-w-[20%] max-w-[30%] flex-grow bg-[rgba(28,12,34,0.2)] relative"
                                                    style={{
                                                        fontSize: 'calc(0.2rem + 1vw)'
                                                    }}
                                                >
                                                    {player ? (
                                                        <>
                                                            <h2 className="text-2xl font-bold my-2">{player.name}</h2>
                                                            <h1 className='text-md font-medium absolute left-2 top-0'><span className='font-light'>#</span>{player.number}</h1>
                                                            <h1 className='text-md font-medium absolute right-2 top-0'>{teamName}</h1>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                {Object.entries(player.stats ?? {}).map(([category, subcategories]) => (
                                                                    <div key={category}>
                                                                        <h3 className="font-semibold text-center">{category.toUpperCase()}</h3>
                                                                        {Object.entries(subcategories).map(([subCategory, stats]) => (
                                                                            <div key={subCategory} className="border-t mt-2 pt-2">
                                                                                <ul>
                                                                                    {Object.entries(stats).map(([statName, value]) => (
                                                                                        <li 
                                                                                            key={statName}
                                                                                            className="my-1 text-xs tracking-tighter font-light flex justify-between"
                                                                                            style={{
                                                                                                fontSize: 'calc(0.1rem + 1vw)'
                                                                                            }}
                                                                                        >
                                                                                            <span>{statName.replace('Average', 'Avg.')}</span>
                                                                                            <span className="font-bold">{Number.isInteger(value) ? value : value.toFixed(3)}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <p>Player not found</p>
                                                    )}
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                        )

                        /* Somehow something ended up as the selected overlay that I didn't anticipate */
                        : (
                            <div className='flex w-full h-full flex-col items-center justify-center'>
                                <h2 className='text-9xl'>borkded</h2>
                                <h2 className='text-3xl'>Selected overlay is equal to an unforseen {typeof selectedOverlay}<br/>Its value is {selectedOverlay}</h2>
                            </div>
                        )
                    }
                </div>
            </div>
            
        </>
    )
}

export default OverlayPage