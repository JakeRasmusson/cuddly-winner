import React, { useState } from 'react'
import './Player.css'

const Player = ({ id, name, number, position, onUpdate, onDragStart }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({name, number, position})

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        //console.log("Form Submitted")
        onUpdate(id, formData)
        setIsEditing(false)
    }

    return (
        <div className="player" draggable onDragStart={e => onDragStart(e, id)} data-id={id}>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="player-form">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="Number"
                        required
                    />
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Position"
                        required
                    />
                    <div className="button-container">
                        <button type="submit">Save</button>
                        <button type="button" onClick={ _ => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="player-details" onClick = { _ => setIsEditing(true)}>
                    
                    <p>{position}</p>
                    <h3>#{number}</h3>
                    <h4>{name}</h4>
                </div>
            )}
        </div>
    )
}
export default Player;