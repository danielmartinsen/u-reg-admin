import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { loadFirebase } from '../lib/firebase'
import styles from '../styles/table.module.scss'

export default function Row({ row }) {
  const [open, setOpen] = useState(false)
  var gyldighet = 'Gyldig'

  const firebase = loadFirebase()
  const db = firebase.firestore()

  const dato = new Date()
  const idagDato = dato.getFullYear() + `${dato.getMonth() + 1}` + dato.getDate()
  const lisensDato = new Date(row.lisens.dato)

  const lisensDatoFormattet =
    lisensDato.getFullYear() + `${lisensDato.getMonth() + 1}` + lisensDato.getDate()

  const lisensDatoReadable =
    lisensDato.getDate() + '.' + `${lisensDato.getMonth() + 1}` + '.' + lisensDato.getFullYear()

  if (lisensDatoFormattet < idagDato) {
    gyldighet = 'Ikke gyldig'
  }

  function actionDelete(lisensKey) {
    db.collection('Kunder').doc(lisensKey).delete()
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.navn}</TableCell>
        <TableCell>{row.kommune}</TableCell>
        <TableCell>{gyldighet}</TableCell>
        <TableCell>
          <a href={row.domene} target='_blank'>
            {row.domene}
          </a>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <div className={styles.infoBox}>
                <div>
                  <h2>Informasjon</h2>
                  <p>
                    <b>Lisens: </b>
                    <i className={styles.licenseTag}>{row.lisens.key}</i>
                    &nbsp;(Utgår {lisensDatoReadable})
                  </p>
                  <p>
                    <b>Fakturaadresse:</b> {row.fakturaadresse}
                  </p>
                </div>

                <div>
                  <h2>Kontaktperson</h2>
                  <div>
                    <p>
                      <b>Navn:</b> {row.kontaktperson.navn}
                    </p>
                    <p>
                      <b>E-post:</b> {row.kontaktperson.epost}
                    </p>
                    <p>
                      <b>Telefon:</b> {row.kontaktperson.telefon}
                    </p>
                  </div>
                </div>
              </div>

              <button className={styles.kundeBtn}>Endre</button>
              <button className={styles.kundeBtn}>Forny</button>
              <button className={styles.kundeBtn} onClick={(e) => actionDelete(row.lisens.key, e)}>
                Slett
              </button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
