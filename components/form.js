import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import randomstring from 'randomstring'

import styles from '../styles/form.module.scss'
import { loadFirebase } from '../lib/firebase'

export default function Form() {
  const { register, handleSubmit } = useForm()
  const [formCompleted, handleComplete] = useState(false)
  const license = randomstring.generate(32)

  const firebase = loadFirebase()
  const db = firebase.firestore()

  function createPassword(length) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

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
      domene: 'https://ureg.now.sh',
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
      login: {
        brukernavn: data.brukernavn,
        passord: createPassword(5),
      },
      logo: 'https://ungias.com/logodemo.png',
    }

    const kundeRef = db.collection('Kunder').doc(data.key)
    const brukereRef = db.collection('Kunder').doc(data.key).collection('Brukere').doc('--stats--')
    const loggRef = db.collection('Kunder').doc(data.key).collection('Logg').doc('--stats--')
    const displayRef = db.collection('Kunder').doc(data.key).collection('Tavle').doc('--info--')
    const ansatteRef = db.collection('Kunder').doc(data.key).collection('Ansatte').doc('--stats--')

    const batch = db.batch()

    batch.set(kundeRef, kundeData)
    batch.set(brukereRef, { innsjekkCount: 0, stats: true, userCount: 0 })
    batch.set(displayRef, { melding: '' })
    batch.set(ansatteRef, { stats: true, count: 0 })
    batch.set(loggRef, { stats: true })

    batch.commit().then(() => {
      handleComplete(true)
      document.getElementById('kundeForm').reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id='kundeForm' className={styles.form}>
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
        <input
          type='text'
          placeholder='Admin-brukernavn'
          name='brukernavn'
          ref={register}
          required
        />
      </div>

      <input type='submit' value='Legg til' />

      {formCompleted ? (
        <div className={styles.formFeedback}>
          <p>Kunden er registrert!</p>
        </div>
      ) : (
        ''
      )}
    </form>
  )
}
