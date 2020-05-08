import React from 'react'
import { loadCSS } from 'fg-loadcss'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'

import styles from '../styles/table.module.scss'

function createData(navn, kommune, gyldighet, domene) {
  return { navn, kommune, gyldighet, domene }
}

const rows = [
  createData('Midtgard Ungdomshus', 'Ås Kommune', 'Gyldig', 'https://br-reg-midtgard.now.sh'),
  createData('Brakka', 'Nordre Follo Kommune', 'Ugyldig', 'https://br-reg-brakka.now.sh'),
]

export default function kundeTable() {
  React.useEffect(() => {
    loadCSS('https://use.fontawesome.com/releases/v5.12.0/css/all.css', document.querySelector('#font-awsome-css'))
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead className={styles.tableHeader}>
          <TableRow>
            <TableCell>Navn</TableCell>
            <TableCell>Kommune</TableCell>
            <TableCell>Gyldighet</TableCell>
            <TableCell>Domene</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {rows.map((row) => (
            <TableRow key={row.navn}>
              <TableCell>{row.navn}</TableCell>
              <TableCell>{row.kommune}</TableCell>
              <TableCell>{row.gyldighet}</TableCell>
              <TableCell>
                <a href={row.domene}>{row.domene}</a>
              </TableCell>
              <TableCell align='right'>
                <Icon className='fa fa-info-circle' />
                <Icon className='fa fa-sync-alt' />
                <Icon className='fa fa-trash' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
