import React from 'react'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import styles from '../styles/table.module.scss'

function Row({ row }) {
  const [open, setOpen] = React.useState(false)

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
        <TableCell>{row.gyldighet}</TableCell>
        <TableCell>
          <a href={row.domene}>{row.domene}</a>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <div className={styles.infoBox}>
                <div>
                  <h2>Informasjon</h2>
                  {row.lisens.map((lisensRow) => (
                    <p key={`${row.navn} "-lisens"`}>
                      <b>Lisens:</b> {lisensRow.key} <i>(Utgår {lisensRow.dato})</i>
                    </p>
                  ))}
                  <p>
                    <b>Fakturaadresse:</b> {row.fakturaadresse}
                  </p>
                </div>

                <div>
                  <h2>Kontaktperson</h2>
                  {row.kontaktperson.map((kontaktpersonRow) => (
                    <div key={`${row.navn} "-kontaktperson"`}>
                      <p>
                        <b>Navn:</b> {kontaktpersonRow.navn}
                      </p>
                      <p>
                        <b>E-post:</b> {kontaktpersonRow.epost}
                      </p>
                      <p>
                        <b>Telefon:</b> {kontaktpersonRow.telefon}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.kundeBtn}>Endre</button>
              <button className={styles.kundeBtn}>Forny</button>
              <button className={styles.kundeBtn}>Slett</button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const rows = [
  {
    navn: 'Midtgard Ungdomshus',
    kommune: 'Ås Kommune',
    gyldighet: 'Gyldig',
    domene: 'https://br-reg-midtgard.now.sh',
    fakturaadresse: 'Skoleveien 1, 1435 Ås',
    kontaktperson: [
      { navn: 'Nicklas Erdal', epost: 'nicklas.erdal.as.kommune.no', telefon: '95533123' },
    ],
    lisens: [{ key: 'j4b1FLkDQtSITyNMn2KDkAKFQrt5pNUm', dato: '09.05.2021' }],
  },
]

export default function kundeTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={styles.tableHeader}>
          <TableRow>
            <TableCell />
            <TableCell>Navn</TableCell>
            <TableCell>Kommune</TableCell>
            <TableCell>Gyldighet</TableCell>
            <TableCell>Domene</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
