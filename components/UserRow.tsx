import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, ListIcon, ListItem, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/core";
import { User } from "../interfaces";
import { FaExclamationTriangle, FaUserShield, FaUserSlash, FaUser, FaChevronRight, FaCheck, FaTimes } from 'react-icons/fa'
type Props = {
    user: User
}

const iconMap = (user: User) => {
    if (user.admin) {
        return FaUserShield;
    }
    else if (user.disabled) {
        return FaUserSlash;
    }
    return FaUser;
}

const UserRow = ({ user }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    if (!user) {
        return (
            <ListItem>
                <ListIcon icon={FaExclamationTriangle} color="yellow.500" />
                Nevalidni podaci o korisniku
            </ListItem>
        )
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Upravljanje korisnikom</DrawerHeader>

                    <DrawerBody d="flex" flexDir="column" alignItems="center">
                        <Avatar name={user.email} />
                        <Text mt={2} fontWeight="bold">{user.email}</Text>
                        <SimpleGrid columns={2} spacing={4} w="100%" mt={4}>
                            <Text fontSize="xl">Kreiran:</Text>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Text>{user.creationTime}</Text>
                            </Box>
                            <Text fontSize="xl">Aktivan: {user.disabled ? 'NE' : 'DA'}</Text>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {user.disabled ? <FaTimes color="red" /> : <FaCheck color="green" />}
                            </Box>
                            <Text fontSize="xl">Admin: {user.admin ? 'DA' : 'NE'}</Text>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {!user.admin ? <FaTimes color="red" /> : <FaCheck color="green" />}
                            </Box>
                        </SimpleGrid>
                        <Box flexGrow={1} d="flex" flexDir="column-reverse" w="100%" mt={12} pb={10}>
                            <Stack w="100%" spacing={4}>
                                <Text>Akcije:</Text>
                                <Button >{user.disabled ? "Aktiviraj nalog" : "Deaktiviraj nalog"}</Button>
                                <Button >Resetuj password</Button>
                                <Button variantColor="red" >Obriši nalog</Button>
                            </Stack>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <ListItem as={Button} onClick={onOpen} w="100%" d="flex" justifyContent="space-between" px={3} alignItems="center" h='150px' boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;" bg="white" my={3}>
                <ListIcon icon={iconMap(user)} size="40px" />
                <Stack>
                    <Text fontWeight="bold">{user.email}</Text>
                    <Text fontSize="xs" color="gray.500">{user.creationTime}</Text>
                </Stack>
                <FaChevronRight />
            </ListItem>
        </>
    );
}

export default UserRow