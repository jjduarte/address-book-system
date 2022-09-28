import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserForm = (props) => {
    const [user, setUser] = useState({
        id: props.user ? props.user.id : '',
        first_name: props.user ? props.user.first_name : '',
        last_name: props.user ? props.user.last_name : '',
        age: props.user ? props.user.age : 0
    });

    const [errorMsg, setErrorMsg] = useState('');
    const {id, first_name, last_name, age } = user;

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [first_name, last_name, age];
        let errorMsg = '';

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if (allFieldsFilled) {
            const user = {
                id: id || uuidv4(),
                first_name,
                last_name,
                age,
            };
            props.handleOnSubmit(user);
        } else {
            errorMsg = 'Please fill out all the fields.';
        }
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'age':
                if (value === '' || parseInt(value) === +value) {
                    setUser((prevState) => ({
                        ...prevState,
                        [name]: parseInt(value)
                    }));
                }
                break;
            default:
                setUser((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
        }
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <form onSubmit={handleOnSubmit}>
                <label>User Name</label>
                <input
                    className="input-control"
                    type="text"
                    name="first_name"
                    value={first_name}
                    placeholder="Enter user's first name"
                    onChange={handleInputChange}
                />

                <label>User Last Name</label>
                <input
                    className="input-control"
                    type="text"
                    name="last_name"
                    value={last_name}
                    placeholder="Enter user's last name"
                    onChange={handleInputChange}
                />

                <label>Age</label>
                <input
                    className="input-control"
                    type="number"
                    name="age"
                    value={age}
                    placeholder="Enter user's age"
                    onChange={handleInputChange}
                />

                <button type="submit">
                    Submit
                </button>
                {props.user &&   <button onClick={() => {
                    props.setSelectedUser(null)
                }}>Cancel</button>}
            </form>
        </div>
    );
};

export default UserForm;