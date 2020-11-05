import DataTable from "react-data-table-component";
import useUsers from "../data/useUsers";
import { User } from "../interfaces";
import UserRow from './UserRow';

const columns = [
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Datum kreiranja',
        selector: 'creationTime',
        sortable: true,
    },
    {
        name: 'Deaktiviran',
        selector: 'disabled',
        sortable: true,
        cell: (row: any) => (row.disabled ? "da" : "ne")
    },
    {
        name: 'Admin',
        selector: 'admin',
        sortable: true,
        cell: (row: any) => (row.admin ? "da" : "ne")
    },
];

const UserList = () => {
    const { users, error, loading } = useUsers();
    if (loading) {
        return <div>Ućitavam</div>
    }
    if (error) {
        return <div> puklo u učitavanju :( {JSON.stringify(error)}</div>
    }

    return (
        <div>
            <DataTable
                title="Korisnici"
                columns={columns}
                data={users as User[]}
                defaultSortField="Email"
                expandableRows
                expandOnRowClicked
                highlightOnHover
                striped
            />
        </div>);
    // const userComponents = [];
    // if (users && users.length > 0) {
    //     userComponents.push(...users.map(u => <UserRow key={u.uid} user={u} />));
    // }
    // else {
    //     userComponents.push(<div>nema usera ?</div>);
    // }
    // return <>{userComponents}</>
}

export default UserList