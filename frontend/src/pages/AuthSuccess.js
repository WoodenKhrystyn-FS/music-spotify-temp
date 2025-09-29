import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


//Catches the token, saves it and redirects back to login/search based on verification/validity:

const AuthSuccess = () => {
    const navigate = useNavigate();
    // const location = useLocation();

    useEffect(() => {
        // Parse token from URL hash or query string
       
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            // Store token in localStorage
            localStorage.setItem('spotify_token', token);
            // Redirect to search page
            navigate('/search');
        } else {
            // If no token, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h2>Please wait for Login...</h2>
        </div>
    );
};

export default AuthSuccess;