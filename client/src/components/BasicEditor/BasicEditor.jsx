const BasicEditor = ({player, onClose}) => {
    return (
        <div className="editor">
            <h2>Edit Player Info</h2>
            <input placeholder="Name" defaultValue={player.name} />
            <input placeholder="Number" defaultValue={player.number} />
            <input placeholder="Position" defaultValue={player.position} />
            <button onClick={onClose}>Save</button>
        </div>
    )
}

export default BasicEditor