import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404</h1>
            <p>i think you got lost</p>
            <Link to="/">home</Link>
        </div>
    )
}

export default NotFound