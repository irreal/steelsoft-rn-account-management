import { Button, InputGroup, Input, InputRightElement, Icon, Stack } from "@chakra-ui/core"
import { useEffect, useState } from "react";
import useUser from "../data/useUser";
import Router from "next/router";
import { login } from "../services/auth";

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
      <h1>Login stranica</h1>
      <Stack spacing={4}>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Unesite email"
          value={email}
          onChange={changeEmail}
        />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Unesite password"
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
          login(email, password).then((success) => {
            if (!success) {
              setLoginError('Greška prilikom logovanja, proverite kredencijale');
            }
          mutate();
          }).catch(() => {
            setLoginError('Greška prilikom logovanja, proverite kredencijale');
           });
      }}>Uloguj se</Button>
        {loginError && <p>{loginError}</p>}
      </Stack>
    </>
)
}

export default IndexPage
