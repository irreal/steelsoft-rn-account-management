import Layout from '../components/Layout'
import useUser from '../data/useUser';
import { useEffect } from 'react';
import Router from "next/router";
import UserList from '../components/UserList';

const DashboardPage = () => {

  const { loading, loggedOut } = useUser();

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/");
    }
  }, [loggedOut]);
  if (loggedOut) return "redirecting...";
  if (loading) return "loading...";
  return (
    <Layout title="SteelSoft RN - Admin">
      <UserList />
    </Layout>
  )
}

export default DashboardPage
