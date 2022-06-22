import React from "react";

import { Link, useNavigate } from "react-router-dom";

import logoutIcon from "../logout-icon.png"
import { logoutUser } from "../api/uams";
import LogoutDto from "../model/LogoutDto";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authenticationSlice";

function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username, isLoggedIn } = useSelector((state) => state.authentication);

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
            <div>
                <Link className="home-link" to="/"
                >Home</Link>
            </div>
            {isLoggedIn && (
                <>
                    <div>
                        <Link className="channel-data-link" to="/channel-data"
                        >Channel data</Link>
                    </div>
                    <div
                        onClick={handleLogout} 
                        style={{ float: "right" }}>
                        <img style={{ width: "50px" }} src={logoutIcon} alt="Logout"/>
                    </div>
                </>
            )}
        </div>
    );
}

export default Menu;