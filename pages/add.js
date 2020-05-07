import React from 'react'
import { useForm } from 'react-hook-form'
import randomstring from 'randomstring'

import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import styles from '../styles/add.module.scss'

export default function Add() {
  const { user, loading } = useFetchUser({ required: true })
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)
  const license = randomstring.generate(32)

  return (
    <Layout user={user} loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formContainer}>
          <p>Kommunen</p>
          <input type='text' placeholder='Navn' name='Navn' ref={register} required />
          <input type='text' placeholder='Kommune' name='Kommune' ref={register} required />
          <input type='text' placeholder='Fakturaadresse' name='Fakturaadresse' ref={register} required />
        </div>

        <div className={styles.formContainer}>
          <p>Kontaktperson</p>
          <input type='text' placeholder='Navn' name='kpNavn' ref={register} required />
          <input type='text' placeholder='Epost' name='kpEpost' ref={register} required />
          <input type='number' placeholder='Telefon' name='kpTelefon' ref={register} required />
        </div>

        <div className={styles.formContainer}>
          <p>Lisens</p>
          <input type='text' placeholder='Lisens' name='Lisens' value={license} ref={register} disabled />
          <input type='number' placeholder='Gyldighet (år)' name='Aar' ref={register} required />
          <input type='text' placeholder='Domene' name='Domene' ref={register} required />
        </div>

        <input type='submit' value='Legg til' />
      </form>
    </Layout>
  )
}
