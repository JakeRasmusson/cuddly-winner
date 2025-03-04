import { useState, useEffect } from 'react'

const StatsModal = ({ player, isOffense }) => {

    const [baseStats, setBaseStats] = useState({})
    const [autoStats, setAutoStats] = useState({})

    useEffect(_ => {
        if(!player) return

        console.log(player)

        const offenseDefense = _ => {
            if(player.team == 'home'){
                return isOffense
            }
            else {
                return !isOffense
            }
        }
        
    })

    return (
        <>
        </>
    )
}

export default StatsModal