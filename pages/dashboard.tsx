import { useContext, useEffect } from "react"
import Router from 'next/router';

import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { withSSRAuth } from "../services/utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data)

  return {
    props: {}
  }
})