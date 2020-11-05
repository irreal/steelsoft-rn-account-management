import { Button, Stack } from "@chakra-ui/core";
import { User } from "../interfaces";

const UserList = ({ data }: { data: User | undefined }) => {
    if (!data) {
        return <p>Nevalidni detalji korisnika</p>
    }
    return (

        <Stack isInline spacing={4} padding={6}>
            <Button size="sm" >{data.disabled ? "Aktiviraj nalog" : "Deaktiviraj nalog"}</Button>
            <Button size="sm" >Resetuj password</Button>
            <Button size="sm" variantColor="red" >Obriši nalog</Button>
        </Stack>
    )
}

export default UserList;