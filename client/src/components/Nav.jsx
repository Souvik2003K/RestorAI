import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Nav() {

    const navigate = useNavigate();
    const userSession = localStorage.getItem('user');

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        navigate('/');
        // window.location.reload();
    }

    console.log(userSession);

    return (
        <nav className="border shadow-lg p-3 mb-5">
            <div className='flex justify-between items-center'>
                <h1 className='font-bold logo_text cursor-pointer'>
                <Link to='/'>RestorAI</Link>
                </h1>
                {userSession ?  
                <button className='bg-orange-400 px-5 py-3 text-white rounded-xl font-bold' onClick={logout}>
                    <Link to='/login'>Logout</Link>
                </button> : 
                <div className='grid grid-cols-2 gap-4'>
                    <button className='border border-orange-400 px-5 py-3 text-orange-400 rounded-xl font-bold'>
                        <Link to='/login'>Log In</Link>
                    </button>
                    <button className='bg-orange-400 px-5 py-3 text-white rounded-xl font-bold'>
                        <Link to='/signup'>Sign Up</Link>
                    </button>
                </div>}

            </div>
        </nav>
    )
}
