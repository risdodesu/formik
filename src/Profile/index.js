import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    // logic
    useEffect(()=>{
        if(!localStorage.getItem('SID')){
            navigate('/login')
        }
    }, [navigate])
  
    return (
        <p>Profile Component</p>
    );
}
export default Profile;