import React from 'react'
import Layout from '../components/layout'
import Form from '../components/form'
import { useFetchUser } from '../lib/user'

export default function Add() {
  const { user, loading } = useFetchUser({ required: true })

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading...</p>}
      {!user && <p>Vennligst logg inn</p>}
      {user && <Form />}
    </Layout>
  )
}
