import { useState } from 'react'

const StatsEditor = ({ player, onSave, onClose }) => {

    const [form, setForm] = useState({
        points: player.points || 0,
        assists: player.assists || 0,
        rebounds: player.rebounds || 0
    })

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: parseInt(value, 10) || 0}))
    }

    const handleClear = _ => {
        setForm({points: 0, assists: 0, rebounds: 0})
    }

    const handleSubmit = _ => {
        onSave({ ...player, ...form })
    }
    
    return (
        <div className="editor">
            <h2>Edit Player Stats</h2>
            <input placeholder="Points" name="points" type="number" value={form.points} onChange={handleChange}/>
            <input placeholder="Assists" name="assists" type="number" value={form.assists} onChange={handleChange}/>
            <input placeholder="Rebounds" name="rebounds" type="number" value={form.rebounds} onChange={handleChange}/>
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default StatsEditor