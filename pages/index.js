import React from 'react'

import Layout from '../components/layout'
import Table from '../components/table'
import { useFetchUser } from '../lib/user'

import { loadFirebase } from '../lib/firebase'

export async function getServerSideProps(context) {
  const firebase = await loadFirebase()
  const db = firebase.firestore()

  const result = await new Promise((resolve, reject) => {
    db.collection('Kunder')
      .limit(10)
      .get()
      .then((snapshot) => {
        const data = []

        snapshot.forEach((doc) => {
          data.push(
            Object.assign(
              {
                id: doc.id,
              },
              doc.data()
            )
          )
        })
        resolve(data)
      })
      .catch((error) => {
        reject([])
      })
  })
  return { props: { result } }
}

export default function Home({ result }) {
  const { user, loading } = useFetchUser()
  console.log(user)

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading...</p>}
      {!user && <p>Vennligst logg inn</p>}
      {user && <Table data={result} />}
      {user && (
        <p>
          Logget inn som <b>{user.name}</b>
        </p>
      )}
    </Layout>
  )
}
