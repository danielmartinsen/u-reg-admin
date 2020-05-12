import React from 'react'
import { useForm } from 'react-hook-form'
import randomstring from 'randomstring'
import styles from '../styles/form.module.scss'

import { loadFirebase } from '../lib/firebase'

export default function Form() {
  const { register, handleSubmit } = useForm()
  const license = randomstring.generate(32)

  const firebase = loadFirebase()
  const db = firebase.firestore()

  const onSubmit = (data) => {
    const dato = new Date()
    const idagDato = `${dato.getMonth() + 1}` + '-' + dato.getDate() + '-' + dato.getFullYear()

    const lisensGyldighet =
      `${dato.getMonth() + 1}` +
      '-' +
      dato.getDate() +
      '-' +
      (dato.getFullYear() + parseInt(data.ar))

    var kundeData = {
      domene: data.domene,
      fakturaadresse: data.fakturaadresse,
      kommune: data.kommune,
      kontaktperson: {
        navn: data.kpNavn,
        epost: data.kpEpost,
        telefon: data.kpTelefon,
      },
      lisens: {
        key: data.key,
        dato: lisensGyldighet,
      },
      navn: data.navn,
      registrert: idagDato,
    }
    db.collection('Kunder').doc(data.key).set(kundeData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formContainer}>
        <p>Kommunen</p>
        <input type='text' placeholder='Navn' name='navn' ref={register} required />
        <input type='text' placeholder='Kommune' name='kommune' ref={register} required />
        <input
          type='text'
          placeholder='Fakturaadresse'
          name='fakturaadresse'
          ref={register}
          required
        />
      </div>

      <div className={styles.formContainer}>
        <p>Kontaktperson</p>
        <input type='text' placeholder='Navn' name='kpNavn' ref={register} required />
        <input type='text' placeholder='Epost' name='kpEpost' ref={register} required />
        <input type='number' placeholder='Telefon' name='kpTelefon' ref={register} required />
      </div>

      <div className={styles.formContainer}>
        <p>Lisens</p>
        <input
          type='text'
          placeholder='Lisens'
          name='key'
          value={license}
          ref={register}
          disabled
        />
        <input type='number' placeholder='Gyldighet (år)' name='ar' ref={register} required />
        <input type='text' placeholder='Domene' name='domene' ref={register} required />
      </div>

      <input type='submit' value='Legg til' />
    </form>
  )
}
