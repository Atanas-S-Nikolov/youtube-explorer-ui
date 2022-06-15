class LogoutDto {
    constructor(username) {
        this._username = username;
    };

    getUsername() {
        return this._username;
    };
}

export default LogoutDto;