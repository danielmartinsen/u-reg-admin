import React from 'react'
import Link from 'next/link'

import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import styles from '../styles/add.module.scss'

export default function Add() {
  const { user, loading } = useFetchUser({ required: true })

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading...</p>}
    </Layout>
  )
}
