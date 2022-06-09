class CredentialDto {
    constructor(username, password) {
        this._username = username;
        this._password = password;
    };

    getUsername() {
        return this._username;
    };

    getPassword() {
        return this._password;
    };
}

export default CredentialDto;