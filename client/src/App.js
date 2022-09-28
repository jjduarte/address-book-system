import './App.css';
import { useEffect, useState } from 'react'
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/queries'
import UpdateUser from './components/UpdateUser';

function App() {
  const [sortField, setSortField] = useState('age')
  const { data } = useQuery(GET_USERS, {
    variables: {
      sortBy: { field: sortField, order: "ASC" }
    } });
  const [userList, setUserList] = useState()
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() =>{
    setUserList(data);
  }, [userList, data])

  return (
    <div>
      <div className="main-content">
        <UserList sortField={sortField} setSortField={setSortField} userData={userList} setSelectedUser={setSelectedUser} selectedUser={selectedUser} setUserList={setUserList}/>
        {!selectedUser && <AddUser sortField={sortField}/>}
        {selectedUser && <UpdateUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />}
      </div>
    </div>
  );
}

export default App;
