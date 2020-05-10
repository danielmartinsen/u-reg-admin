import React from 'react'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import styles from '../styles/table.module.scss'

export default function Row({ row }) {
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
                  {row.lisens.map((lisensRow) => (
                    <p key={`${row.navn} "-lisens"`}>
                      <b>Lisens:</b>
                      <license className={styles.licenseTag}> {lisensRow.key} </license>
                      <i>(Utgår {lisensRow.dato})</i>
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
