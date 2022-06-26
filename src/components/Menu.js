import React, { useState } from "react";

import { Tooltip } from "antd";

import { Link, useNavigate } from "react-router-dom";

import logoutIcon from "../logout-icon.png"
import logoutIconNegative from "../logout-icon-negative.png"
import { logoutUser } from "../api/uams";
import LogoutDto from "../model/LogoutDto";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authenticationSlice";

function renderLogoutIcon(isHover) {
    return (
        isHover 
        ? <img style={{ width: "50px" }} src={logoutIconNegative} alt="Logout"/>
        : <img style={{ width: "50px" }} src={logoutIcon} alt="Logout"/>
    );
}

function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username, isLoggedIn } = useSelector((state) => state.authentication);
    const [isHover, setIsHover] = useState(false);

    let handleOnMouseEnter = () => {
        setIsHover(true);
    }

    let handleOnMouseLeave = () => {
        setIsHover(false);
    }

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
            <Tooltip title="Home page" placement="bottom">
                <div>
                    <Link className="home-link" to="/"
                    >Home</Link>
                </div>
            </Tooltip>
            {isLoggedIn && (
                <>
                    <Tooltip title="Channel data page" placement="bottom">
                        <div>
                            <Link className="channel-data-link" to="/channel-data"
                            >Channel data</Link>
                        </div>
                    </Tooltip>
                    <Tooltip title="Logout" placement="bottom">
                        <div
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleLogout} 
                            style={{ float: "right" }}>
                            {renderLogoutIcon(isHover)}
                        </div>
                    </Tooltip>
                </>
            )}
        </div>
    );
}

export default Menu;