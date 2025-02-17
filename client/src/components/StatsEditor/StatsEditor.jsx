const StatsEditor = ({ player, onClose }) => {
    return (
        <div className="editor">
            <h2>Edit Player Stats</h2>
            <input placeholder="Points" />
            <input placeholder="Assists" />
            <input placeholder="Rebounds" />
            <button onClick={onClose}>Save</button>
        </div>
    )
}

export default StatsEditor