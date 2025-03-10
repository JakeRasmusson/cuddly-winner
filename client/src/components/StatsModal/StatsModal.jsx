import { useState, useEffect } from 'react'

import { useGameList } from '../../contexts/gameListContext'

const StatsModal = ({ game, p, team, isOffense, sportStats, onClose, onSave }) => {

    let player = team == 'home' ? game.team1.players.find(person => person.id == p) : game.team2.players.find(person => person.id == p)

    const { editGame, editPlayer } = useGameList()

    const [baseStats, setBaseStats] = useState({})
    const [autoStats, setAutoStats] = useState({})

    const offenseDefense = _ => {
        if(team == 'home'){
            return isOffense ? 'offense' : 'defense'
        }
        else {
            return isOffense ? 'defense' : 'offense'
        }
    }

    useEffect(_ => {
        if(!player) return
    
        const initialBaseStats = Object.fromEntries(
            sportStats[offenseDefense()].base.map(stat => [
                stat,
                player.stats?.[offenseDefense()]?.base?.[stat] ?? 0,
            ])
        )

        setBaseStats(initialBaseStats)
    }, [player, sportStats, isOffense])

    useEffect( _ => {
        if(!player) return

        let calculatedStats = {}
        let dependenciesResolved = false
        let iterationCount = 0
        const maxIterations = 10
    
        while (!dependenciesResolved && iterationCount < maxIterations) {
            dependenciesResolved = true
            iterationCount++
    
            Object.entries(sportStats[offenseDefense()].autocalculated).forEach(
                ([statName, [calcFunc, ...dependencies]]) => {
                    const values = dependencies.map(
                        (dep) => baseStats[dep] ?? calculatedStats[dep] ?? 0
                    )
                    const newValue = calcFunc(...values)
    
                    if(calculatedStats[statName] !== newValue) {
                        calculatedStats[statName] = newValue
                        dependenciesResolved = false
                    }
                }
            )
        }
    
        if (iterationCount >= maxIterations) {
            console.warn('Potential circular dependency detected in stat calculations')
        }
    
        setAutoStats(calculatedStats)

    }, [baseStats, sportStats, isOffense])
    

    const handleStatChange = e => {
        const { name, value } = e.target
        const newValue = parseInt(value, 10) || 0

        setBaseStats(prev => ({
            ...prev,
            [name]: newValue
        }))
    }

    const incrementStat = stat => {
        setBaseStats(prev => {
            const updatedStats = { ...prev, [stat]: (prev[stat] || 0) + 1 }
      
            if(stat == 'Home Runs Allowed') {
                updatedStats['Hits Allowed'] = (prev['Hits Allowed'] || 0) + 1
            }
      
            return updatedStats
        })
    }
      
    const decrementStat = stat => {
        setBaseStats(prev => {
            const updatedStats = { ...prev, [stat]: Math.max(0, (prev[stat] || 0) - 1 )}
      
            if(stat == 'Home Runs Allowed' && prev[stat] > 0) {
                updatedStats['Hits Allowed'] = Math.max(0, (prev['Hits Allowed'] || 0) - 1);
            }
      
            return updatedStats
        })
    }

    const handleSave = _ => {
        onSave(player.id, player.team, {
            isOffense: player.team == 'home' ? isOffense : !isOffense,
            baseStats: baseStats,
            autoStats: autoStats,
        })
    }

    return (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-1">
            <div className="flex flex-col bg-[rgba(28,12,34,0.9)] w-[80%] h-auto rounded-2xl border-2 border-yellow-400 shadow-[0_0_25px_rgb(250,204,21)] relative p-6">
                <button className="absolute right-4 top-2 text-5xl text-red-600 hover:text-red-800 transition-all duration-300 hover:cursor-pointer hover:rotate-15" onClick={onClose}>&times;</button>
                <button className="absolute left-4 top-2 text-5xl text-green-400 hover:text-green-600 transition-all duration-300 hover:cursor-pointer hover:rotate-15" onClick={handleSave}><i className="fa-solid fa-check" /></button>
                <h1 className="self-center mb-[55px] border-b-1 text-2xl font-extralight tracking-[8px] text-yellow-300 w-[80%]">
                    {player.name}'s {offenseDefense()[0].toUpperCase()}{offenseDefense().substring(1, 6)}ive Stats
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(baseStats).map(([stat, value]) => (
                        <div key={stat} className="flex flex-col items-center gap-2">
                            <label className="text-sm font-medium">{stat}:</label>
                            <div className="flex items-center gap-2">
                                <button onClick={() => decrementStat(stat)} className="px-2 bg-gray-300 rounded hover:bg-gray-400 text-purple-800 text-3xl">-</button>
                                <input
                                    name={stat}
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleStatChange(e)}
                                    className="border p-1 w-16 text-center"
                                />
                                <button onClick={() => incrementStat(stat)} className="px-2 bg-gray-300 rounded hover:bg-gray-400 text-purple-800 text-3xl">+</button>
                            </div>
                        </div>
                    ))}
                    {Object.entries(autoStats).map(([stat, value]) => (
                        <div key={stat} className="flex flex-col items-center">
                            <span className="text-sm font-medium">{stat}:</span>
                            <span className="font-bold">{value.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StatsModal