export const useLogOut = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/auth/jwt/logout`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            localStorage.removeItem('token');
            window.location.reload();
        } else {
            console.error('Error logging out:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};