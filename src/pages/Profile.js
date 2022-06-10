import React, {useContext} from 'react';
import { UserContext } from '../context/userContext';
import "./css/profile.css";

export default function Profile() {
        const {currentUser} = useContext(UserContext);
        console.log(currentUser);
        return (
            <div>
                <p>email</p>{currentUser.email}
                <p>username</p>{currentUser.displayName}
            </div>
        );
}

