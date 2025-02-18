import React, { useState, useEffect } from 'react'

import './StatsEditor.css'


const calculateHits = (single, double, triple, hr) => {
    return single + double + triple + hr
}
const calculatePlateAppearances = (hits, hbp, walk, strikeout) => {
    return hits + hbp + walk + strikeout
}
const calculateBattingAverage = (hits, ab) => {
    if(ab == 0) return 0
    return hits/ab
}
const calculateSluggingAverage = (singles, doubles, triples, homeRuns, ab) => {
    if(ab == 0) return 0
    return (singles + (2 * doubles) + (3 * triples) + (4 * homeRuns)) / ab
}
const calculateOnBasePercentage = (hits, walks, hbp, ab, sac) => {
    if(ab + walks + hbp + sac == 0) return 0
    return ((hits + walks + hbp) / (ab + walks + hbp + sac)) * 100
}
const calculateYardsPerCarry = (rushingYards, rushingAttempts) => {
    if(rushingAttempts == 0) return 0
    return rushingYards / rushingAttempts
}
const calculateCompletionPercentage = (completions, att) => {
    if(att == 0) return 0
    return (completions / att) * 100
}
const calculateFieldGoalPercentage = (att, make) => {
    if(att == 0) return 0
    return (make / att) * 100
}
const calculateRebounds = (off, def) => {
    return off + def
}

const sportsStats = {
    baseball: {
        stats: {
            offense: ['Hit by Pitch', 'Walks', 'Strikeouts', 'Sacrifice Flies', 'Home Runs', 'RBI', 'Singles', 'Doubles', 'Triples'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: {
                'Hits': [calculateHits, 'Singles', 'Doubles', 'Triples', 'Home Runs'],
                'Plate Appearances': [calculatePlateAppearances, 'Hits', 'Hit by Pitch', 'Walks', 'Strikeouts'],
                'Batting Average': [calculateBattingAverage, 'Hits', 'Plate Appearances'],
                'Slugging Average': [calculateSluggingAverage, 'Singles', 'Doubles', 'Triples', 'Home Runs', 'Plate Appearances'],
                'On Base Percentage': [calculateOnBasePercentage, 'Hits', 'Walks', 'Hit by Pitch', 'Plate Appearances', 'Sacrifice Flies']
            }
        }
    },
    softball: {
        stats: {
            offense: ['Hit by Pitch', 'Walks', 'Strikeouts', 'Sacrifice Flies', 'Home Runs', 'RBI', 'Singles', 'Doubles', 'Triples'],
            defense: ['Strikeouts', 'Walks', 'Errors'],
            autocalculated: {
                'Hits': [calculateHits, 'Singles', 'Doubles', 'Triples', 'Home Runs'],
                'Plate Appearances': [calculatePlateAppearances, 'Hits', 'Hit by Pitch', 'Walks', 'Strikeouts'],
                'Batting Average': [calculateBattingAverage, 'Hits', 'Plate Appearances'],
                'Slugging Average': [calculateSluggingAverage, 'Singles', 'Doubles', 'Triples', 'Home Runs', 'Plate Appearances'],
                'On Base Percentage': [calculateOnBasePercentage, 'Hits', 'Walks', 'Hit by Pitch', 'Plate Appearances', 'Sacrifice Flies']
            }
        }
    },
    football: {
        stats: {
            offense: ['Passing Attempts', 'Completions', 'Passing Yards', 'Touchdowns Thrown', 'Interceptions', 'Quarterback Rating', 'Rushing Attempts', 'Rushing Yards', 'Touchdowns', 'Fumbles', 'Receptions', 'Receiving Yards', 'Targets', 'Sacks Allowed', 'Penalties'],
            defense: ['Solo Tackles', 'Assisted Tackles', 'Tackles for Loss', 'Sacks', 'Quarterback Hits', 'Interceptions', 'Passes Defended', 'Forced Fumbles', 'Fumble Recoveries', 'Defensive Touchdowns', 'Safety', 'Blocked Kicks', 'Pressures', 'Hurries'],
            autocalculated: {
                'Completion Percentage': [calculateCompletionPercentage, 'Completions', 'Passing Attempts'],
                'Yards per Carry': [calculateYardsPerCarry, 'Rushing Yards', 'Rushing Attempts'],
                'Yards per Reception': [calculateYardsPerCarry, 'Passing Yards', 'Passing Attempts']
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
    
        
        const unresolved = { ...autocalculated };
    
        
        while (Object.keys(unresolved).length > 0) {
            let resolvedInThisPass = false;
    
            Object.entries(unresolved).forEach(([field, details]) => {
                const [calculationFn, ...dependencies] = details;
    
                
                const allDependenciesResolved = dependencies.every(dep => 
                    results.hasOwnProperty(dep) || formData.hasOwnProperty(dep)
                );
    
                if (allDependenciesResolved) {
                    
                    const args = dependencies.map(dep => 
                        parseFloat(results[dep] || formData[dep]) || 0
                    );
    
                    
                    results[field] = calculationFn(...args);
    
                    
                    delete unresolved[field];
                    resolvedInThisPass = true;
                }
            });
    
            if (!resolvedInThisPass) {
                console.error('Circular dependency or missing dependency detected:', unresolved);
                break;
            }
        }
    
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
        const newValue = parseInt(value, 10) || 0;
    
        setForm(prev => {
            const updatedForm = { ...prev, [name]: newValue };
    
            if (name == 'Completions') {
                const previousCompletions = prev[name] || 0;
                if (newValue > previousCompletions) {
                    updatedForm['Passing Attempts'] = (prev['Passing Attempts'] || 0) + 1;
                }
            }
    
            return updatedForm;
        });
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

                    {
                        autocalculated && Object.keys(autocalculatedResults).map(key => {
                            const value = autocalculatedResults[key];
                            console.log(typeof value, value, key)
                            const displayValue = parseFloat(value) ? parseFloat(value).toFixed(2) : '0.00'; // Fallback for non-numbers
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