import { Button } from "@chakra-ui/core"
import { useEffect } from "react";
import useUser from "../data/useUser";
import Router from "next/router";
import { login } from "../services/auth";

const IndexPage = () => {
  const { user, loading, mutate } = useUser();

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
      <Button onClick={() => {
        login('milos.s.pfc@gmail.com', 'Test.1234!!').then(() => {
          mutate();
        });
      }}>Uloguj se</Button>
    </>
)
}

export default IndexPage
