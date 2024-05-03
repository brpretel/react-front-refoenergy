import React, { useState, useEffect } from 'react';
import "../style/Configuration.css";

function Configuration() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://refoenergyean-production.up.railway.app/admin/show_all_pending_users/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('Data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleStatusChange = async (user, newStatus) => {
        const url = new URL(`https://refoenergyean-production.up.railway.app/admin/update_user_status/${user.id}`);
        url.searchParams.append('status', newStatus);

        console.log(`URL: ${url.toString()}`);
        try {
            const response = await fetch(url.toString(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                fetchData();
            } else {
                console.error('Failed to update status:', await response.text());
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="dashboard-layout">
            <h1>Pending Users</h1>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <div>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Status:</strong> {user.status}</p>
                            <p><strong>Role:</strong> {user.user_role}</p>
                        </div>
                        <div>
                            <select 
                                id={`status-select-${user.id}`}
                                value={user.status} 
                                onChange={(e) => console.log(e.target.value)}
                                className="status-dropdown">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button onClick={() => handleStatusChange(user, document.querySelector(`#status-select-${user.id}`).value)}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Configuration;
