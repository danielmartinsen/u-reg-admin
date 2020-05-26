import React, { useEffect, useContext, useState } from 'react'

import Layout from '../components/layout'
import Table from '../components/table'
import { useFetchUser } from '../lib/user'

import { loadFirebase } from '../lib/firebase'
import { FetchContext } from '../lib/context'

export async function getServerSideProps() {
  const firebase = await loadFirebase()
  const db = firebase.firestore()

  const result = await new Promise((resolve, reject) => {
    db.collection('Kunder')
      .get()
      .then(snapshot => {
        const data = []

        snapshot.forEach(doc => {
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
      .catch(error => {
        console.log(error)
      })
  })
  return { props: { result } }
}

export default function Home({ result }) {
  const { user, loading } = useFetchUser()
  const [fetchState, setFetchState] = useState(false)

  return (
    <FetchContext.Provider value={[fetchState, setFetchState]}>
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
    </FetchContext.Provider>
  )
}
