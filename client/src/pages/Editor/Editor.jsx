import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useGameList } from "../../contexts/gameListContext"
import { useEditingGame } from "../../contexts/editingGameContext"

import StatsSelector from "../../components/StatsSelector/StatsSelector"
import OverlayPreview from "../../components/OverlayPreview/OverlayPreview"
import TeamList from "../../components/TeamList/TeamList"
import ActiveRoster from "../../components/ActiveRoster/ActiveRoster"

const Editor = () => {
    //So the back button can navigate us back to the home page
    const navigate = useNavigate()

    //Context to allow us to access the list of available games and the currently editing game
    const { gameList } = useGameList()
    const { editingGame, setEditingGame } = useEditingGame()

    //Get all the details of this current game
    const game = gameList.find(g => g.id == editingGame) || {
        id: 1,
        sport: "Cup Stacking",
        team1: {
            town: "Town 1",
            players: [
                {
                    grade: "11",
                    height: "6'2",
                    id: "home0",
                    name: "Mark Abelang",
                    number: "15",
                    position: "TE/LB",
                    team: "home",
                    weight: "182",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'11",
                    id: "home1",
                    name: "Joesepth Smith",
                    number: "69",
                    position: "QB/RB",
                    team: "home",
                    weight: "205",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'11",
                    id: "home2",
                    name: "Reallylongplayer NameTest1",
                    number: "9",
                    position: "QB/RB",
                    team: "home",
                    weight: "205",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'1",
                    id: "home3",
                    name: "Test player 2",
                    number: "34",
                    position: "QB/RB",
                    team: "home",
                    weight: "205",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'11",
                    id: "home4",
                    name: "Test player 3",
                    number: "96",
                    position: "QB/RB",
                    team: "home",
                    weight: "205",
                    active: false
                },
            ]
        },
        team2: {
            town: "Town 2",
            players: [
                {
                    grade: "11",
                    height: "6'2",
                    id: "away0",
                    name: "away Mark Abelang",
                    number: "15",
                    position: "TE/LB",
                    team: "away",
                    weight: "182",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'11",
                    id: "away1",
                    name: "Joesepth asdf Smith",
                    number: "69",
                    position: "QB/RB",
                    team: "away",
                    weight: "205",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'11",
                    id: "away2",
                    name: "a really long player name test abcde",
                    number: "45",
                    position: "QB/RB",
                    team: "away",
                    weight: "205",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'1",
                    id: "away3",
                    name: "steven h rodrick",
                    number: "73",
                    position: "QB/RB",
                    team: "away",
                    weight: "205",
                    active: false
                },
                {
                    grade: "12",
                    height: "5'11",
                    id: "away4",
                    name: "Test player 3",
                    number: "64",
                    position: "QB/RB",
                    team: "away",
                    weight: "205",
                    active: false
                }
            ]
        }
    }

    const stats = {
        baseball: {
            offense: {
                base: 'Singles, Doubles, Triples, Home Runs, Walks, Hit by Pitch, Strikeouts'.split(', '),
                //Calculation function, dependencies
                autocalculated: {
                    'Hits' : [(s, d, t, hr) => {return s + d + t + hr}, 'Singles', 'Doubles', 'Triples', 'Home Runs'],
                    'Plate Appearances': [(h, hbp, w, k) => {return h + hbp + w + k}, 'Hits', 'Hit by Pitch', 'Walks', 'Strikeouts'],
                    'Batting Average': [(h, ab) => {return !ab ? 0 : h / ab}, 'Hits', 'Plate Appearances'],
                    'Slugging Average': [(s, d, t, hr, ab) => {return !ab ? 0 : (s + (2 * d) + (3 * t) + (4 * hr)) / ab}]
                }
            },
            defense: {
                base: 'Errors'.split(', '),
                autocalculated: {}
            }
        },
        softball: {
            offense: {
                base: 'Singles, Doubles, Triples, Home Runs, Walks, Hit by Pitch, Strikeouts'.split(', '),
                //Calculation function, dependencies
                autocalculated: {
                    'Hits' : [(s, d, t, hr) => {return s + d + t + hr}, 'Singles', 'Doubles', 'Triples', 'Home Runs'],
                    'Plate Appearances': [(h, hbp, w, k) => {return h + hbp + w + k}, 'Hits', 'Hit by Pitch', 'Walks', 'Strikeouts'],
                    'Batting Average': [(h, ab) => {return !ab ? 0 : h / ab}, 'Hits', 'Plate Appearances'],
                    'Slugging Average': [(s, d, t, hr, ab) => {return !ab ? 0 : (s + (2 * d) + (3 * t) + (4 * hr)) / ab}]
                }
            },
            defense: {
                base: 'Errors'.split(', '),
                autocalculated: {}
            }
        },
        football: {
            offense: {
                base: ''.split(', '),
                autocalculated: {

                }
            },
            defense: {
                base: ''.split(', '),
                autocalculated: {

                }
            }
        },
        basketball: {
            offense: {
                base: ''.split(', '),
                autocalculated: {

                }
            },
            defense: {
                base: ''.split(', '),
                autocalculated: {
                    
                }
            }
        },
        soccer: {
            offense: {
                base: ''.split(', '),
                autocalculated: {

                }
            },
            defense: {
                base: ''.split(', '),
                autocalculated: {
                    
                }
            }
        }
    }

    game.team1.players = game.team1.players.map(player => {
        const sportStats = stats[game?.sport.toLowerCase()]

        const initializeBaseStats = category => {
            return Object.fromEntries(
                sportStats[category].base.map(stat => [stat, player.stats?.[category]?.base?.[stat] ?? 0])
            )
        }

        const calculateAutoStats = (category, baseStats) => {
            return Object.fromEntries(
                Object.entries(sportStats[category].autocalculated).map(([statName, [calcFunc, ...dependencies]]) => {
                    const values = dependencies.map(dep => baseStats[dep] ?? 0)
                    return [statName, calcFunc(...values)]
                })
            )
        }

        const offenseBase = initializeBaseStats('offense')
        const defenseBase = initializeBaseStats('defense')

        return {
            ...player,
            stats: {
                offense: {
                    base: offenseBase,
                    autocalculated: calculateAutoStats('offense', offenseBase),
                },
                defense: {
                    base: defenseBase,
                    autocalculated: calculateAutoStats('defense', defenseBase)
                }
            }
        }
    })


    console.log(game.team1.players)

    //Upon click of the back button
    const handleReturn = _ => {
        setEditingGame('')        //We're no longer editing a game
        navigate('/')             //Take us back home!
    }

    return (
        <>
            <button
                onClick={handleReturn}
                className="text-sm absolute top-3 left-3 cursor-pointer rounded-md border-1 border-yellow-400 bg-transparent px-2 py-1 text-yellow-200 shadow transition-all duration-300 hover:bg-white/15 hover:shadow-[0_0_10px_rgb(250,204,21)]"
            >
                Return to Game List
            </button>

            <div className="flex flex-col items-center justify-center">
                <p className="text-4xl font-light tracking-[15px] text-yellow-200 italic">
                    {game.team1.town} VS {game.team2.town}
                </p>
                <p className="text-md my-5 font-extralight tracking-[10px] text-yellow-50 italic">
                    {game.sport.toUpperCase()}
                </p>
            </div>

            <div className="flex">
                <StatsSelector />
                <OverlayPreview />
            </div>

            <div className="flex">
                <ActiveRoster game={game}/>
                <TeamList game={game} />
            </div>
        </>
    )
}

export default Editor
