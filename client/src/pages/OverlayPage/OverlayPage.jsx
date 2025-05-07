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

    const decodePosition = position => {
        switch(position){
            case '1B': return 'First Base'
            case '2B': return 'Second Base'
            case '3B': return 'Third Base'
            case 'SS': return 'Shortstop'
            case 'P': return 'Pitcher'
            case 'LF': return 'Left Field'
            case 'RF': return 'Right Field'
            case 'CF': return 'Center Field'
            case 'C': return 'Catcher'
            default: return position
        }
    }
    

    const team1 = game?.team1
    const team2 = game?.team2

    function sumStats(teamPlayers){

        const averageStats = ['Batting Average', 'Slugging Average']
        const omitStats = ['Plate Appearances', 'Batters Faced']

        const teamStats = {
            offense: {
                base: {},
                autocalculated: {}
            },
            defense: {
                base: {},
                autocalculated: {}
            }
        }

        for(const player of teamPlayers){
            for(const stat in player.stats.offense.base){
                teamStats.offense.base[stat] = (teamStats.offense.base[stat] || 0) + player.stats.offense.base[stat]
            }
            for(const stat in player.stats.offense.autocalculated){
                teamStats.offense.autocalculated[stat] = (teamStats.offense.autocalculated[stat] || 0) + player.stats.offense.autocalculated[stat]
            }
            for(const stat in player.stats.defense.base){
                teamStats.defense.base[stat] = (teamStats.defense.base[stat] || 0) + player.stats.defense.base[stat]
            }
            for(const stat in player.stats.defense.autocalculated){
                teamStats.defense.autocalculated[stat] = (teamStats.defense.autocalculated[stat] || 0) + player.stats.defense.autocalculated[stat]
            }
        }

        for(const stat of averageStats){
            const category = teamStats.offense.autocalculated
            const baseCategory = teamStats.offense.base
            if(category.hasOwnProperty(stat)){
                if(stat == 'Batting Average'){
                    category['Batting Average'] = (category['Hits'] / category['Plate Appearances']) || 0.0
                }
                if(stat == 'Slugging Average'){
                    category['Slugging Average'] = ((baseCategory['Singles'] + 
                                                2 * baseCategory['Doubles'] +
                                                3 * baseCategory['Triples'] +
                                                4 * baseCategory['Home Runs']) /
                                                category['Plate Appearances']) || 0.0
                }
            }
        }
        
        
        for(const stat in teamStats.offense.autocalculated){
            if(omitStats.includes(stat)) delete teamStats.offense.autocalculated[stat]
        }
        for(const stat in teamStats.defense.autocalculated){
            if(omitStats.includes(stat)) delete teamStats.defense.autocalculated[stat]
        }
        

        return teamStats
    }

    const playerAnalyzer = config => {
        const {
            offensiveWeights,
            defensiveWeights,
            isPitcherCheck = player => player.position.split('/').includes('P'),
            offensiveStatMap = {},
            defensiveStatMap = {}
        } = config

        const processStats = statsCategory => {
            console.log("Category" + JSON.stringify(statsCategory))
            const result = {...statsCategory.base}

            for(const [statName, [formula, ...dependencies]] of Object.entries(statsCategory.autocalculated || {})){
                const args = dependencies.map(dep => statsCategory.base[dep])
                result[statName] = formula(...args)
            }

            return result
        }

        const calculateContribution = (processedStats, weights, statMap) => {
            return Object.entries(weights).reduce((total, [stat, weight]) => {
                const mappedStat = statMap[stat] || stat
                const baseVal = processedStats.base?.[mappedStat] ?? 0
                const autoVal = processedStats.autocalculated?.[mappedStat] ?? 0

                return (total + baseVal + autoVal) * weight
            }, 0)
        }

        return {
            analyzePlayer(player){
                const offense = player.stats.offense
                const defense = player.stats.defense

                const isPitcher = isPitcherCheck(player)

                const offensiveScore = calculateContribution(
                    offense,
                    offensiveWeights,
                    offensiveStatMap
                )
                const defensiveScore = calculateContribution(
                    defense,
                    isPitcher ? defensiveWeights : { errors: defensiveWeights.errors },
                    defensiveStatMap
                )

                return {
                    offensiveScore, defensiveScore, totalScore: offensiveScore + defensiveScore
                }
            },
            findStarPlayer(players){
                if(!players || !players.length) return null

                let star = null
                let highestScore = -Infinity

                for(const player of players){
                    const { totalScore } = this.analyzePlayer(player)

                    if(totalScore > highestScore){
                        highestScore = totalScore
                        star = player
                    }
                }
                
                return star
            }
        }
    }

    const baseballConfiguration = {
        offensiveWeights: {
            singles: 1,
            doubles: 2,
            triples: 3,
            homeruns: 4,
            walks: 1,
            hbp: 1,
            strikeouts: -0.5
        },
        defensiveWeights: {
            strikeouts: 1.5,
            walks: -1,
            hitsAllowed: -1,
            hrAllowed: -2,
            errors: 1
        },
        offensiveStatMap: {
            singles: 'Singles',
            doubles: 'Doubles',
            triples: 'Triples',
            homeruns: 'Home Runs',
            walks: 'Walks',
            hbp: 'Hit by Pitch',
            strikeouts: 'Strikeouts'
        },
        defensiveStatMap: {
            strikeouts: 'Strikeouts',
            walks: 'Walks',
            hitsAllowed: 'Hits Allowed',
            hrAllowed: 'Home Runs Allowed',
            errors: 'Errors'
        }
    }

    const footballConfiguration = {
        offensiveWeights: {},
        defensiveWeights: {},
        offensiveStatMap: {},
        defensiveStatMap: {}
    }

    const soccerConfiguration = {
        offensiveWeights: {},
        defensiveWeights: {},
        offensiveStatMap: {},
        defensiveStatMap: {}
    }

    const basketballConfiguration = {
        offensiveWeights: {},
        defensiveWeights: {},
        offensiveStatMap: {},
        defensiveStatMap: {}
    }


    const team = selectedOverlay == 'overall team 1' ? team1 : selectedOverlay == 'overall team 2' ? team2 : null
    const analyzer = playerAnalyzer({
        baseball: baseballConfiguration,
        softball: baseballConfiguration,
        football: footballConfiguration,
        soccer: soccerConfiguration,
        basketball: basketballConfiguration
    }[game?.sport])

    let star1 = null
    let star2 = null

    if(selectedOverlay?.split(' ')[0] == 'Position'){
        star1 = analyzer.findStarPlayer(team1.players)
        star2 = analyzer.findStarPlayer(team2.players)
    }

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

                        /* Display overall team stats */
                        : (selectedOverlay == 'overall team 1' || selectedOverlay == 'overall team 2') ? (
                            <div className="min-h-screen p-0 overflow-hidden relative">

                                <div className="flex justify-center pt-12 pb-16 items-center">
                                    <h2 className="text-4xl font-black tracking-[8px] px-10 py-5 bg-yellow-400/90 text-purple-900 shadow-[8px_8px_0_0_rgba(139,92,246,0.3)] ">
                                        {team?.town}
                                        <br />
                                        <span className="text-lg tracking-widest font-medium">TEAM STATS</span>
                                    </h2>
                                </div>

                                <div className="flex justify-center items-start gap-[20%] px-8">
                                    <div className="w-[400px] bg-purple-800/20 shadow-[10px_10px_rgba(250,204,21,0.3)] border-4 border-yellow-400 transform -skew-x-6 rotate-3 origin-right overflow-hidden">
                                        <div className="transform p-5 origin-right ">
                                            <h3 className="font-black text-center text-yellow-400 py-3 mb-5 text-2xl border-b-4 border-yellow-400 tracking-tighter bg-purple-900 mx-[-20px] px-[20px]">
                                                OFFENSE
                                            </h3>
                                            <div className="space-y-2">
                                                {Object.entries(sumStats(team?.players)?.offense ?? {}).map(([subCategory, stats]) => (
                                                    <div key={subCategory} className="bg-purple-900 p-4 border-l-4 border-yellow-400">
                                                        <ul>
                                                            {Object.entries(stats).map(([statName, value]) => (
                                                                <li key={statName} className="flex justify-between items-center text-purple-100 px-3">
                                                                    <span className="font-light">{statName.replace('Average', 'Avg.')}</span>
                                                                    <span className="font-black text-yellow-400 text-lg">{Number.isInteger(value) ? value : value.toFixed(2)}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                
                                    <div className="w-[400px] bg-purple-800/30 shadow-[10px_10px_rgba(250,204,21,0.3)] border-4 border-yellow-400 transform skew-x-6 -rotate-3 origin-right overflow-hidden">
                                        <div className="transform p-5 origin-right">
                                            <h3 className="font-black text-center text-yellow-400 py-3 mb-5 text-2xl border-b-4 border-yellow-400 tracking-tighter bg-purple-900 mx-[-20px] px-[20px]">
                                                DEFENSE
                                            </h3>
                                            <div className="space-y-2">
                                                {Object.entries(sumStats(team?.players)?.defense ?? {}).map(([subCategory, stats]) => (
                                                    <div key={subCategory} className="bg-purple-900 p-4 border-l-4 border-yellow-400">
                                                        <ul>
                                                            {Object.entries(stats).map(([statName, value]) => (
                                                                <li key={statName} className="flex justify-between items-center text-purple-100 px-3">
                                                                    <span className="font-light">{statName.replace('Average', 'Avg.')}</span>
                                                                    <span className="font-black text-yellow-400 text-lg">{Number.isInteger(value) ? value : value.toFixed(2)}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        )

                        : selectedOverlay?.split(' ')[0] == 'Position' ? (
                            <div className="min-h-screen p-0 overflow-hidden relative">
    <div className="flex justify-center pt-12 pb-8 items-center">
        <h2 className="text-4xl font-black tracking-[8px] px-10 py-5 bg-yellow-400/90 text-purple-900 shadow-[8px_8px_0_0_rgba(139,92,246,0.3)]">
            {decodePosition(selectedOverlay?.split(` `)[1])}
            <br />
            <span className="text-lg tracking-widest font-medium">POSITION COMPARISON</span>
        </h2>
    </div>
    
    <div className="flex justify-center items-start gap-25 px-4">
        {/* Player 1 Card */}
        <div className="w-[380px] bg-purple-800/20 shadow-[10px_10px_rgba(250,204,21,0.3)] border-4 border-yellow-400 transform -skew-x-6 rotate-3 origin-right overflow-hidden">
            <div className="transform p-4 origin-right">
                <h3 className="font-black text-center text-yellow-400 py-3 mb-4 text-2xl border-b-4 border-yellow-400 tracking-tighter bg-purple-900 mx-[-16px] px-[16px]">
                    {star1.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(star1.stats ?? {}).map(([category, subcategories]) => (
                        <div key={category} className="col-span-1">
                            <h3 className="font-semibold text-center text-sm mb-2">{category.toUpperCase()}</h3>
                            {Object.entries(subcategories).map(([subCategory, stats]) => (
                                <div key={subCategory} className="border-t mt-1 pt-1">
                                    <ul>
                                        {Object.entries(stats).map(([statName, value]) => (
                                            <li 
                                                key={statName}
                                                className="my-1 text-xs tracking-tighter font-light flex justify-between"
                                            >
                                                <span className="truncate">{statName.replace('Average', 'Avg.')}</span>
                                                <span className="font-bold ml-2">{Number.isInteger(value) ? value : value.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Player 2 Card */}
        <div className="w-[380px] bg-purple-800/30 shadow-[10px_10px_rgba(250,204,21,0.3)] border-4 border-yellow-400 transform skew-x-6 -rotate-3 origin-right overflow-hidden">
            <div className="transform p-4 origin-right">
                <h3 className="font-black text-center text-yellow-400 py-3 mb-4 text-2xl border-b-4 border-yellow-400 tracking-tighter bg-purple-900 mx-[-16px] px-[16px]">
                    {star2.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(star2.stats ?? {}).map(([category, subcategories]) => (
                        <div key={category} className="col-span-1">
                            <h3 className="font-semibold text-center text-sm mb-2">{category.toUpperCase()}</h3>
                            {Object.entries(subcategories).map(([subCategory, stats]) => (
                                <div key={subCategory} className="border-t mt-1 pt-1">
                                    <ul>
                                        {Object.entries(stats).map(([statName, value]) => (
                                            <li 
                                                key={statName}
                                                className="my-1 text-xs tracking-tighter font-light flex justify-between"
                                            >
                                                <span className="truncate">{statName.replace('Average', 'Avg.')}</span>
                                                <span className="font-bold ml-2">{Number.isInteger(value) ? value : value.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
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