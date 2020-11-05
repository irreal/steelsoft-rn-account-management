import Layout from '../components/Layout'
import { useRecoilState } from 'recoil'
import { textState } from '../atoms/textState'
import { Button } from '@chakra-ui/core';
import { logout } from '../services/auth';
import useUser from '../data/useUser';
import { useEffect } from 'react';
import Router from "next/router";
import UserList from '../components/UserList';

const DashboardPage = () => {
  const [text, setText] = useRecoilState(textState);
  const onChange = (event: any) => {
    setText(event.target.value);
  };

  const { user, loading, loggedOut, mutate } = useUser();

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/");
    }
  }, [loggedOut]);
  if (loggedOut) return "redirecting...";
  if (loading) return "loading...";
  return (
    <Layout title="SteelSoft RN - Admin">
      <h1>Hello Next.js 👋 qwe {text}</h1>
      <input type="text" value={text} onChange={onChange} />
      <p>email je: {user?.email}</p>
      <Button onClick={() => {
        logout().then(() => {
          mutate();
        });
      }}>Izloguj se</Button>
      <UserList />
    </Layout>
  )
}

export default DashboardPage
