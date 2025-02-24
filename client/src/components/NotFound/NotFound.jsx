import { Link } from 'react-router-dom'
import Dale from '../../assets/Dale_nobackground.png'

import './NotFound.css'

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404</h1>
            <p>i think you got lost</p>
            <p>say hi to dale, then head back to the home page</p>
            <Link to="/">home</Link>
            <div className="dale">
                <h3>Dale</h3>
                <div className="curved-arrow">
                    <svg className="arrowhead" viewBox="0 0 20 20" width="20" height="20">
                        <polygon points="0,0 20,10 0,20" fill="rgba(216, 115, 0)" />
                    </svg>
                </div>
                <img src={Dale} alt="Dale" />
            </div>
        </div>
    )
}

export default NotFound