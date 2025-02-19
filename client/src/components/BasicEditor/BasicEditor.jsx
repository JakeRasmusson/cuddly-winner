import { useState } from 'react'
import './BasicEditor.css'

const BasicEditor = ({player, onSave, onClose}) => {

    const [form, setForm] = useState({
        name: player.name,
        number: player.number,
        position: player.position
    })

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value}))
    }

    const handleClear = _ => {
        if(window.confirm('Are you sure you want to clear all fields?  This action cannot be undone')){
            setForm({name: '', number: '', position: ''})
        }
        
    }

    const handleSubmit = _ => {
        //console.log("asdfjasdfkasdf" + player)
        onSave({ ...player, ...form })
    }

    return (
        <div className="editor-overlay">
            <div className="editor-basic">
                <h2>Edit Player Info</h2>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="number">Number</label>
                    <input id="number" name="number" placeholder="Number" value={form.number} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="position">Position</label>
                    <input id="position" name="position" placeholder="Position" value={form.position} onChange={handleChange} />
                </div>
                <div className="button-group">
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={handleClear}>Clear</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default BasicEditor