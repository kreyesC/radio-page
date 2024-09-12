import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

import Header from './Logbook/Header'
import { useCombinedContext } from '../contex/RFContext';


// const data = [
//   {
//     fecha: '08/09/2024',
//     hora: '22:19:58',
//     indicativo: 'CE5HKW',
//     estacion: 'CE5HKW',
//     operador: 'Amin González Sergio Enrique',
//     frecuencia: 'A',
//     tipoEmision: 'SSB',
//     senalRecibida: '56',
//     senalEnviada: '58',
//     observaciones: 'Hola',
//     localidad: 'Chiguayante',
//     apoyos: [
//       { indicativo: 'CE5ERO', estacion: 'CE5ERO', operador: 'ACUÑA ACUÑA JORGE ALEJANDRO', comuna: 'Los Ángeles' }
//     ],
//     sufijos: [
//       { sufijo: 'JEH', indicativo: 'CE2JEH', operador: 'ALFARO MALUENDA JORGE EUGENIO' }
//     ]
//   },
// ];

function ApoyosDialog({ open, onClose, apoyos }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Detalle de Apoyos</DialogTitle>
            <DialogContent>
                {apoyos.map((apoyo, index) => (
                    <div key={index}>
                        <p><strong>Indicativo:</strong> {apoyo.indicativo}</p>
                        <p><strong>Estación:</strong> {apoyo.estacion}</p>
                        <p><strong>Operador:</strong> {apoyo.operador}</p>
                        <p><strong>Comuna:</strong> {apoyo.comuna}</p>
                        <hr />
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

function SufijosDialog({ open, onClose, sufijos }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Detalle de Sufijos</DialogTitle>
            <DialogContent>
                {sufijos.map((sufijo, index) => (
                    <div key={index}>
                        <p><strong>Sufijo:</strong> {sufijo.sufijo}</p>
                        <p><strong>Indicativo:</strong> {sufijo.indicativo}</p>
                        <p><strong>Operador:</strong> {sufijo.operador}</p>
                        <hr />
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

function LibroQSO() {
    const { userData } = useCombinedContext();
    const [openApoyos, setOpenApoyos] = useState(false);
    const [openSufijos, setOpenSufijos] = useState(false);
    const [selectedApoyos, setSelectedApoyos] = useState([]);
    const [selectedSufijos, setSelectedSufijos] = useState([]);
    const [data, setData] = useState();
    const [profile, setProfileData] = useState({
        comuna: '',
        date: '',
        email: '',
        fechaVencimiento: '',
        indicativo: '',
        licencia: '',
        linkQRZ: ''

    }); 

    
    const handleApoyosClick = (apoyos) => {
        setSelectedApoyos(apoyos);
        setOpenApoyos(true);
    };
    useEffect(() => {
        setData(userData);
        setProfileData({
            comuna: userData.comuna,
            date: userData.date,
            email: userData.email,
            fechaVencimiento: userData.fechaVencimiento,
            indicativo: userData.indicativo,
            licencia: userData.licencia,
            linkQRZ: userData.linkQRZ
        })
    }, [userData]);

    const handleSufijosClick = (sufijos) => {
        setSelectedSufijos(sufijos);
        setOpenSufijos(true);
    };
    console.log(profile)
    return (
        <div style={{ padding: 20 }}>
            <Header profileData={profile}/>
            <h1>Historial de Contactos y Apoyos</h1>
            {/* <TableContainer component={Paper}> */}
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Indicativo</TableCell>
              <TableCell>Estación</TableCell>
              <TableCell>Operador</TableCell>
              <TableCell>Frecuencia</TableCell>
              <TableCell>Tipo Emisión</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.logBook.logBook.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.hora}</TableCell>
                <TableCell>{row.indicativo}</TableCell>
                <TableCell>{row.estacion}</TableCell>
                <TableCell>{row.operador}</TableCell>
                <TableCell>{row.frecuencia}</TableCell>
                <TableCell>{row.tipoEmision}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleApoyosClick(row.apoyos)}>
                    Ver Apoyos
                  </Button>
                  <Button variant="contained" onClick={() => handleSufijosClick(row.sufijos)} style={{ marginLeft: 10 }}>
                    Ver Sufijos
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ApoyosDialog
        open={openApoyos}
        onClose={() => setOpenApoyos(false)}
        apoyos={selectedApoyos}
      />

      <SufijosDialog
        open={openSufijos}
        onClose={() => setOpenSufijos(false)}
        sufijos={selectedSufijos}
      /> */}
        </div>
    );
}

export default LibroQSO;
