import useUsers from "../data/useUsers";
import UserRow from './UserRow';

const UserList = () => {
    const { users, error, loading } = useUsers();
    if (loading) {
        return <div>Ućitavam</div>
    }
    if (error) {
        return <div> puklo u učitavanju :( {JSON.stringify(error)}</div>
    }

    return users && users.length > 0 && users.map(u => <UserRow user={u} />) || <div>nema usera ?</div>;
}

export default UserList