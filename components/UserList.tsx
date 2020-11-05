import { Box, Button, List } from "@chakra-ui/core";
import DataTable from "react-data-table-component";
import useUsers from "../data/useUsers";
import { User } from "../interfaces";
import UserRow from "./UserRow";
import UserActions from "./UserActions"
import { FaCheck, FaTimes, FaUserPlus } from "react-icons/fa";

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
        name: 'Aktivian',
        selector: 'disabled',
        sortable: true,
        cell: (row: any) => (!row.disabled ? <FaCheck color="green" /> : <FaTimes color="red" />)
    },
    {
        name: 'Admin',
        selector: 'admin',
        sortable: true,
        cell: (row: any) => (row.admin ? <FaCheck color="green" /> : <FaTimes color="red" />)
    },
    {
        name: 'ID',
        selector: 'uid',
        sortable: true
    }
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
        <Box>
            <Box display={['none', 'none', 'none', 'inherit']} className='full-height-without-padding' overflow="auto">
                <DataTable
                    title="Korisnici"
                    expandableRows
                    expandOnRowClicked
                    expandableRowsComponent={<UserActions data={undefined} />}
                    columns={columns}
                    data={users as User[]}
                    defaultSortField="Email"
                    highlightOnHover
                    striped
                />
                <Button size="lg" variantColor="blue" rounded={"50%"} className="floating-action-button desktop"><FaUserPlus size="100%" /></Button>
            </Box>
            <Box display={['inherit', 'inherit', 'inherit', 'none']} className='full-height-without-padding' overflow="auto">
                <List spacing={3}>
                    {users?.map(u => (<UserRow user={u} />))}
                </List>
                <Button size="lg" variantColor="blue" rounded={"50%"} className="floating-action-button mobile"><FaUserPlus size="100%" /></Button>
            </Box>
        </Box>);
}

export default UserList