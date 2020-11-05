import { Button, InputGroup, Input, InputRightElement, Icon, Stack, Flex, Image, Box, Heading, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core"
import { useEffect, useState } from "react";
import useUser from "../data/useUser";
import Router from "next/router";
import { login } from "../services/auth";
import Head from 'next/head'
import styles from "./index.module.css"

const IndexPage = () => {
  const { user, loading, mutate } = useUser();

  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const changeEmail = (e: any) => {
    setEmail(e.target.value);
    setLoginError('');
  }
  const changePassword = (e: any) => {
    setPassword(e.target.value);
    setLoginError('');
  }


  useEffect(() => {
    if (user) {
      Router.replace("/dashboard");
    }
  }, [user]);

  if (loading) {
    return (<p>Loading...</p>);
  }
  if (user) {
    return (<p>Redirecting...</p>);
  }

  return (
    <>
      <Head>
        <title>SteelSoft RN Administracija - Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex direction={["column", "column", "row"]} w="100%" h="100vh" align="center" >
        <Flex w="100%" h={["40%", "40%", "100%"]} justify="center" className={styles.workersBackground} >
          <Image alt="background-illustration workers" src="/workers.svg" w="100%" />
        </Flex>
        <Stack w="100%" padding={10} spacing={10} align="center">
          <Flex justify="center">
            <Image src="https://www.steelsoft.rs/resources/template/images/logo.png" alt="SteelSoft logo" />
          </Flex>
          <Box>
            <Heading textAlign="center">Radni Nalozi</Heading>
            <Heading textAlign="center" size="lg">Administracija</Heading>
          </Box>
          <Stack spacing={4} w={["90%", "90%", "50%"]}>
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Email"
              value={email}
              onChange={changeEmail}
            />
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={changePassword}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <Icon aria-label="Hide password" name="view-off" /> : <Icon aria-label="Hide password" name="view" />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button isDisabled={!Boolean(email) || !Boolean(password)} onClick={() => {
              setLoginError('');
              login(email, password).then((success) => {
                if (!success) {
                  setLoginError('Greška prilikom logovanja, proverite kredencijale');
                }
                mutate();
              }).catch(() => {
                setLoginError('Greška prilikom logovanja, proverite kredencijale');
              });
            }}>Uloguj se</Button>
            {loginError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Greška pri logovanju</AlertTitle>
                <AlertDescription>Proverite email i password</AlertDescription>
              </Alert>
            )}
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

export default IndexPage
