import axios from "axios";

import { buildRegisterPayload, buildCredentialPayload } from "../model/payload/UserPayloadBuilder";

const baseURL = "http://localhost:8080/user/api/v1";

const uamsRequest = axios.create({
    baseURL: baseURL,
    headers: { "content-type": "application/json" }
});

export function registerUser(registerDto) {
    return uamsRequest.post("/register", buildRegisterPayload(registerDto));
}

export function loginUser(credentialDto) {
    return uamsRequest.post("/login", buildCredentialPayload(credentialDto));   
}

export function logoutUser(credentialDto) {
    return uamsRequest.post("/logout", buildCredentialPayload(credentialDto));
}

export function sendSearchHistory(search, username) {
    return uamsRequest.patch(`/search-history/${search}/username/${username}`);
}
