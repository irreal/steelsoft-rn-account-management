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

    const userComponents = [];
    if (users && users.length > 0) {
        userComponents.push(...users.map(u => <UserRow key={u.uid} user={u} />));
    }
    else {
        userComponents.push(<div>nema usera ?</div>);
    }
    return <>{userComponents}</>
}

export default UserList