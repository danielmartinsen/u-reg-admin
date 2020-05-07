import React from 'react'
import Link from 'next/link'

import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import styles from '../styles/index.module.scss'

export default function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading...</p>}
    </Layout>
  )
}
