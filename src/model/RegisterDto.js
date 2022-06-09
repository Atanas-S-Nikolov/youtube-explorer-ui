class RegisterDto {
    constructor(name, lastName, username, password) {
        this._name = name;
        this._lastName = lastName;
        this._username = username;
        this._password = password;
    };

    getName() {
        return this._name;
    };

    getLastName() {
        return this._lastName;
    };

    getUsername() {
        return this._username;
    };

    getPassword() {
        return this._password;
    };
}

export default RegisterDto;