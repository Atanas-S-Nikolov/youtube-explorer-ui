import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logoutIcon from "../logout-icon.png"
import { logoutUser } from "../api/uams";
import LogoutDto from "../model/LogoutDto";
import { logout } from "../redux/authenticationSlice";

function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username, isLoggedIn } = useSelector((state) => state.authentication);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
      setIsHovering(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    let handleLogout = () => {
        if(window.confirm("Do you really want to logout?")) {
            logoutUser(new LogoutDto(username)).then((response) => {
                dispatch(logout());
                alert(response.data.message);
                navigate("/");
            }).catch(error => {
                if (error.response.status === 400) {
                    alert(error.response.data.message);
                } else {
                    console.log(error);
                }
            })
        }
    }

    return(
        <div className="nav-bar">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Link to="/"
                    style={{
                        color: isHovering ? 'black' : 'white'
                    }}
                >Home</Link>
            </div>
            <div
                onClick={handleLogout} 
                style={{
                    visibility: isLoggedIn ? "visible" : "hidden",
                    float: "right" 
                 }}>
                <img style={{ width: "50px" }} src={logoutIcon} alt="Logout"/>
            </div>
        </div>
    );
}

export default Menu;