import React, { useState, useEffect } from 'react'

import './StatsEditor.css'

const calculateBattingAverage = (hits, ab) => {
    if(ab == 0) return 0
    return (hits/ab).toFixed(3)
}
const calculateSluggingAverage = (singles, doubles, triples, homeRuns, ab) => {
    if(ab == 0) return 0
    return (singles + (2 * doubles) + (3 * triples) + (4 * homeRuns)) / ab
}
const calculateOnBasePercentage = (hits, walks, hbp, ab, sac) => {
    if(ab + walks + hbp + sac == 0) return 0
    return (((hits + walks + hbp) / (ab + walks + hbp + sac)) * 100).toFixed(1)
}
const calculateCompletionPercentage = (completions, att) => {
    if(att == 0) return 0
    return ((completions / att) * 100).toFixed(1)
}
const calculateFieldGoalPercentage = (att, make) => {
    if(att == 0) return 0
    return ((make / att) * 100).toFixed(1)
}
const calculateRebounds = (off, def) => {
    return off + def
}

const sportsStats = {
    baseball: {
        stats: {
            offense: ['Sacrifice Flies', 'Home Runs', 'RBI', 'Hits', 'Singles', 'Doubles', 'Triples', 'Base on Balls', 'Plate Appearances', 'Strikeouts', 'Stolen Bases', 'Hit by Pitch'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: {
                'Batting Average': [calculateBattingAverage, 'Hits', 'Plate Appearances'],
                'Slugging Average': [calculateSluggingAverage, 'Singles', 'Doubles', 'Triples', 'Home Runs', 'Plate Appearances'],
                'On Base Percentage': [calculateOnBasePercentage, 'Hits', 'Base on Balls', 'Hit by Pitch', 'Plate Appearances', 'Sacrifice Flies']
            }
        }
    },
    softball: {
        stats: {
            offense: ['Home Runs', 'RBI', 'Hits', 'Doubles', 'Triples', 'Base on Balls', 'Plate Appearances', 'Strikeouts', 'Stolen Bases', 'Hit by Pitch'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: {
                'Batting Average': [calculateBattingAverage, 'Hits', 'Plate Appearances'],
                'Slugging Average': [calculateSluggingAverage, 'Singles', 'Doubles', 'Triples', 'Home Runs', 'Plate Appearances'],
                'On Base Percentage': [calculateOnBasePercentage, 'Hits', 'Base on Balls', 'Hit by Pitch', 'Plate Appearances', 'Sacrifice Flies']
            }
        }
    },
    football: {
        stats: {
            offense: ['Passing Attempts', 'Completions', 'Passing Yards', 'Touchdowns Thrown', 'Interceptions', 'Quarterback Rating', 'Rushing Attempts', 'Rushing Yards', 'Touchdowns', 'Yards per Carry', 'Fumbles', 'Receptions', 'Receiving Yards', 'Yards per Reception', 'Targets', 'Sacks Allowed', 'Penalties', 'Snap Counts'],
            defense: ['Solo Tackles', 'Assisted Tackles', 'Tackles for Loss', 'Sacks', 'Quarterback Hits', 'Interceptions', 'Passes Defended', 'Forced Fumbles', 'Fumble Recoveries', 'Defensive Touchdowns', 'Safety', 'Blocked Kicks', 'Pressures', 'Hurries'],
            autocalculated: {
                'Completion Percentage': [calculateCompletionPercentage, 'Completions', 'Passing Attempts']
            }
        }
    },
    basketball: {
        stats: ['Points', 'Field Goals Made', 'Field Goals Attempted', 'Three-Point Field Goals Made', 'Three-Point Field Goals Attempted', 'Free Throws Made', 'Free Throws Attempted', 'Offensive Rebounds', 'Defensive Rebounds', 'Assists', 'Steals', 'Blocks', 'Deflections', 'Fouls'],
        autocalculated: {
            'Field Goal Percentage': [calculateFieldGoalPercentage, 'Field Goals Attempted', 'Field Goals Made'],
            'Three-Point Percentage':[calculateFieldGoalPercentage, 'Three-Point Field Goals Attempted', 'Three-Point Field Goals Made'],
            'Free Throw Percentage': [calculateFieldGoalPercentage, 'Free Throws Attempted', 'Free Throws Made'],
            'Rebounds': [calculateRebounds, 'Offensive Rebounds', 'Defensive Rebounds']
        }
    },
    soccer: {
        stats: ['Goals', 'Assists', 'Shots', 'Shots on Target', 'Chances Created', 'Dribbles Completed', 'Passes Completed', 'Tackles', 'Interceptions', 'Blocks', 'Saves', 'Goals Conceded', 'Penalties Faced', 'Penalties Saved', 'Fouls Committed', 'Yellow Cards', 'Red Cards'],
        autocalculated: ['Shooting Accuracy']
    }
}

const StatsEditor = ({ player, onSave, onClose, sport }) => {

    sport = sport.toLowerCase();

    let stats = sportsStats[sport];
    let autocalculated = stats.stats?.autocalculated || stats.autocalculated;

    if (stats.stats?.offense) {
        stats = stats.stats.offense.concat(stats.stats.defense);
    } else {
        stats = stats.stats;
    }

    const initialFormState = {};
    stats.forEach(stat => {
        initialFormState[stat] = player[stat] || 0;
    });

    const [form, setForm] = useState(initialFormState);
    const [autocalculatedResults, setAutocalculatedResults] = useState({});

    const computeAutocalculatedValues = (autocalculated, formData) => {
        const results = {};

        Object.entries(autocalculated).forEach(([field, details]) => {
            const [calculationFn, ...dependencies] = details;

            const args = dependencies.map(dep => parseFloat(formData[dep]) || 0);

            results[field] = calculationFn(...args);
        });

        return results;
    };

    useEffect(() => {
        if (autocalculated) {
            const results = computeAutocalculatedValues(autocalculated, form);
            setAutocalculatedResults(results);
        }
    }, [form, autocalculated]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    };

    const handleClear = () => {
        const clearedForm = {};
        stats.forEach(stat => {
            clearedForm[stat] = 0;
        });
        setForm(clearedForm);
    };


    const handleSubmit = () => {
        onSave({ ...player, ...form, ...autocalculatedResults });
    };

    return (
        <div className="editor-overlay">
            <div className="editor">
                <h1>{player.name}</h1>
                <h3>#{player.number}</h3>
                <div className="input-container">
                    {Object.keys(form).map(key => (
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
                    ))}

                    {
                        autocalculated && Object.keys(autocalculatedResults).map(key => {
                            const value = autocalculatedResults[key];
                            console.log(typeof value, value, key)
                            const displayValue = parseFloat(value) ? parseFloat(value).toFixed(2) : 'N/A'; // Fallback for non-numbers
                            return (
                                <div key={key} className="input-group">
                                    <label htmlFor={key}>{key}</label>
                                    <input
                                        id={key}
                                        name={key}
                                        type="text"
                                        placeholder={key}
                                        value={displayValue}
                                        disabled
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <div className="button-group">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleClear}>Clear</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default StatsEditor;