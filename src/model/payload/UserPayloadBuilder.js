export function buildRegisterPayload(registerDto) {
    return JSON.stringify({
        "name" : registerDto.getName(),
        "last_name" : registerDto.getLastName(),
        "username" : registerDto.getUsername(),
        "password" : registerDto.getPassword()
    });
} 

export function buildCredentialPayload(credentialDto) {
    return JSON.stringify({
        "username": credentialDto.getUsername(),
        "password": credentialDto.getPassword()
    });
}

export function buildLogoutPayload(LogoutDto) {
    return JSON.stringify({
        "username": LogoutDto.getUsername()
    });
}
