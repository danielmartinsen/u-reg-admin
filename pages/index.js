import React from 'react'

import Layout from '../components/layout'
import Link from 'next/link'
import { useFetchUser } from '../lib/user'
import styles from '../styles/index.module.scss'

export default function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <h1>Administrasjonspanel</h1>
      <Link href='/api/login'>
        <button className={styles.loginBtn}>Trykk her for å logge inn</button>
      </Link>

      {loading && <p>Loading...</p>}

      {user && (
        <>
          <p>Velkommen, {user.name}!</p>
        </>
      )}
    </Layout>
  )
}
