import { Box, List } from "@chakra-ui/core";
import DataTable from "react-data-table-component";
import useUsers from "../data/useUsers";
import { User } from "../interfaces";
import UserRow from "./UserRow";
import UserActions from "./UserActions"
import { FaCheck, FaTimes, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { config, useSpring, animated } from 'react-spring'

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
const vhToPixel = (value: number) => `${(window.innerHeight * value) / 100}px`
const vwToPixel = (value: number) => `${(window.innerWidth * value) / 100}px`

const AnimBox = animated(Box);

const UserList = () => {
    const { users, error, loading } = useUsers();


    const [fabOpen, setFabOpen] = useState(false)

    // const springRef = useRef()
    const props = useSpring({
        //   ref: springRef,
        config: config.stiff,
        from: { "border-radius": "100%", width: '100px', height: '100px', position: 'absolute', "z-index": 1 },
        to: { "border-radius": fabOpen ? "10%" : "100%", width: fabOpen ? vwToPixel(90) : '100px', height: fabOpen ? vhToPixel(90) : '100px', position: 'absolute', "z-index": 1, "background-color": fabOpen ? "white" : "#2A69AC", "padding": "15px", "color": "white" }
    })

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
                <AnimBox boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;" style={props} onClick={() => { setFabOpen(!fabOpen); }} className="floating-action-button desktop"><FaUserPlus size="100%" /></AnimBox>
            </Box>
            <Box display={['inherit', 'inherit', 'inherit', 'none']} className='full-height-without-padding' overflow="auto">
                <List spacing={3}>
                    {users?.map(u => (<UserRow key={u.uid} user={u} />))}
                </List>
                <AnimBox boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;" style={props} onClick={() => { setFabOpen(!fabOpen); }} className="floating-action-button mobile"><FaUserPlus size="100%" /></AnimBox>
            </Box>
        </Box>);
}

export default UserList