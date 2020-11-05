import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/core'
import useUser from '../data/useUser'
import { logout } from '../services/auth'
import Router from "next/router";
type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const user = useUser();
  return (
    <Box h="100vh" d="flex" flexDir="column">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex direction={["column", "column", "column", "row"]} flexGrow={1} >
        <header>
          <Flex as="nav" h={["auto", "auto", "auto", "100%"]} direction={["row", "row", "row", "column"]} px={[4, 1]} py={[1, 4]}>
            <Box my={4} d="flex" flexDir="column" alignItems="center">
              <Avatar name={user.user?.email}></Avatar>
              <Text fontSize="xs">{user.user?.email}</Text>
            </Box>
            <Box d="flex" flexDir={["row-reverse", "row-reverse", "row-reverse", "column-reverse"]} alignItems="center" flexGrow={1}>
              <Button onClick={() => {
                logout().then(() => {
                  Router.replace("/");
                });
              }}>
                Izloguj se
              </Button>
            </Box>
          </Flex>
        </header>
        <Box bg="#EBE7F7" flexGrow={1} p={4}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

export default Layout
