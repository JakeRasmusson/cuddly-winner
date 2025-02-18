import { useState } from 'react'

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
        setForm({name: '', number: '', position: ''})
    }

    const handleSubmit = _ => {
        console.log("asdfjasdfkasdf" + player)
        onSave({ ...player, ...form })
    }

    return (
        <div className="editor">
            <h2>Edit Player Info</h2>
            <input name='name' placeholder="Name" value={form.name} onChange={handleChange} />
            <input name='number' placeholder="Number" value={form.number} onChange={handleChange} />
            <input name='position' placeholder="Position" value={form.position} onChange={handleChange} />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleClear}>Clear</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}

export default BasicEditor