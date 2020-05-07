import React from 'react'
import Link from 'next/link'

import { useFetchUser } from '../lib/user'
import styles from '../styles/nav.module.scss'

export default function Nav({ user, loading }) {
  return (
    <div className={styles.header}>
      <h1>Administrasjonspanel</h1>

      <div className={styles.buttongroup}>
        {!user && (
          <Link href='/api/login'>
            <button>Logg inn</button>
          </Link>
        )}

        {user && (
          <>
            <Link href='/add'>
              <button>Legg til kunde</button>
            </Link>
            <Link href='/api/logout'>
              <button>Logg ut</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
