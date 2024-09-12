'use client'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useCombinedContext } from '../contex/RFContext';
import { Typography, Link } from '@mui/material';

const ListaRF = () => {
  const { rep } = useCombinedContext();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    setRows(rep);
  }, [rep]);

  const columns = [
    { field: 'Nombre', headerName: 'Nombre', width: 300, headerAlign: 'center' },
    { field: 'Banda', headerName: 'Banda', width: 80, headerAlign: 'center' },
    { field: 'Señal', headerName: 'Señal', width: 120, headerAlign: 'center' },
    { field: 'Tx:', headerName: 'Tx', width: 100, headerAlign: 'center' },
    { field: 'Rx:', headerName: 'Rx', width: 100, headerAlign: 'center' },
    { field: 'Tono', headerName: 'Tono', width: 80, headerAlign: 'center' },
    { field: 'Potencia', headerName: 'Potencia', width: 80, headerAlign: 'center' },
    { field: 'Ganancia', headerName: 'Ganancia', width: 80, headerAlign: 'center' },
    { field: 'Región', headerName: 'Región', width: 200, headerAlign: 'center' },
    { field: 'Comuna', headerName: 'Comuna', width: 150, headerAlign: 'center' },
    { field: 'Otorga', headerName: 'Otorga', width: 100, headerAlign: 'center' },
    { field: 'Vence', headerName: 'Vence', width: 100, headerAlign: 'center' },
    { field: 'Latitud', headerName: 'Latitud', width: 100, headerAlign: 'center' },
    { field: 'Longitud', headerName: 'Longitud', width: 100, headerAlign: 'center' },
    { field: 'Ubicación RPT', headerName: 'Ubicación', width: 200, headerAlign: 'center' },
  ];

  return (
    <div style={{ height: 800, width: '100%', overflowX: 'auto' }}>
    <Typography variant="h5" align="center" gutterBottom>
        Listado de Repetidores de Radio Aficionandos, vigentes al 26 de julio de 2024
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        Fuente Subtel --
        <Link href="https://www.subtel.gob.cl/wp-content/uploads/2024/07/Informes_RA_26_07_2024_Repetidoras.xlsx" variant="body2">
          Link de Descarga
        </Link>
      </Typography>

      <div style={{ minWidth: '1500px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={rowsPerPage}
          page={page}
          rowCount={rows.length}
          pagination
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
          autoHeight
        />
      </div>
    </div>
  );
};

export default ListaRF;
