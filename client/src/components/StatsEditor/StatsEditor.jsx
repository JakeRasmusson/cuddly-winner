import { useState } from 'react'

import './StatsEditor.css'

const sportsStats = {
    baseball: {
        stats: {
            offense: ['Home Runs', 'RBI', 'Hits', 'Doubles', 'Triples', 'Base on Balls', 'Plate Appearances', 'Strikeouts', 'Stolen Bases', 'Hit by Pitch'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: ['Batting Average', 'Slugging Average', 'On Base Percentage']
        }
    },
    softball: {
        stats: {
            offense: ['Home Runs', 'RBI', 'Hits', 'Doubles', 'Triples', 'Base on Balls', 'Plate Appearances', 'Strikeouts', 'Stolen Bases', 'Hit by Pitch'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: ['Batting Average', 'Slugging Average', 'On Base Percentage']
        }
    },
    football: {
        stats: {
            offense: ['Passing Attempts', 'Completions', 'Passing Yards', 'Touchdowns Thrown', 'Interceptions', 'Quarterback Rating', 'Rushing Attempts', 'Rushing Yards', 'Touchdowns', 'Yards per Carry', 'Fumbles', 'Receptions', 'Receiving Yards', 'Yards per Reception', 'Targets', 'Sacks Allowed', 'Penalties', 'Snap Counts'],
            defense: ['Solo Tackles', 'Assisted Tackles', 'Tackles for Loss', 'Sacks', 'Quarterback Hits', 'Interceptions', 'Passes Defended', 'Forced Fumbles', 'Fumble Recoveries', 'Defensive Touchdowns', 'Safety', 'Blocked Kicks', 'Pressures', 'Hurries'],
            autocalculated: ['Completion Percentage', 'Tackles']
        }
    },
    basketball: {
        stats: ['Points', 'Field Goals Made', 'Field Goals Attempted', 'Three-Point Field Goals Made', 'Three-Point Field Goals Attempted', 'Free Throws Made', 'Free Throws Attempted', 'Offensive Rebounds', 'Defensive Rebounds', 'Assists', 'Steals', 'Blocks', 'Deflections', 'Fouls'],
        autocalculated: ['Field Goal Percentage', 'Three-Point Percentage', 'Free Throw Percentage', 'Rebounds']
    },
    soccer: {
        stats: ['Goals', 'Assists', 'Shots', 'Shots on Target', 'Chances Created', 'Dribbles Completed', 'Passes Completed', 'Tackles', 'Interceptions', 'Blocks', 'Saves', 'Goals Conceded', 'Penalties Faced', 'Penalties Saved', 'Fouls Committed', 'Yellow Cards', 'Red Cards'],
        autocalculated: ['Shooting Accuracy']
    }
}

const StatsEditor = ({ player, onSave, onClose, sport }) => {

    sport = sport.toLowerCase()
    let stats = sportsStats[sport]

    if(stats.stats.offense){
        stats = stats.stats.offense.concat(stats.stats.defense)
    }
    else {
        stats = stats.stats
    }

    let obj = {}

    stats.forEach(stat => {
        obj[stat] = player[stat] || 0
    })

    const [form, setForm] = useState(obj)

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: parseInt(value, 10) || 0}))
    }

    const handleClear = _ => {
        setForm({})
    }

    const handleSubmit = _ => {
        onSave({ ...player, ...form })
    }
    
    return (
        <div className="editor-overlay">
            <div className="editor">
                <h2>Edit Player Stats</h2>
                <div className="input-container">
                    {
                        Object.keys(form).map(key => (
                            <div key={key} className="input-group">
                                <label htmlFor={key}>{key}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type="number"
                                    placeholder={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="button-group">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleClear}>Clear</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default StatsEditor