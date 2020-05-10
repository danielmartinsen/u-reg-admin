import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import styles from '../styles/table.module.scss'
import Row from './tableRow'

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
            <Row row={row} key={row.navn} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
