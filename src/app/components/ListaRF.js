'use client'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Link } from '@mui/material';
import { useCombinedContext } from '../contex/RFContext';

const ListaRF = () => {
  const { lic } = useCombinedContext();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    setRows(lic);
  }, [lic]);

  const columns = [
    { field: 'Indicativo', headerName: 'Indicativo', width: 100 },
    { field: 'Nombre', headerName: 'Nombre', width: 250 },
    { field: 'Rut', headerName: 'Rut', width: 100 },
    { field: 'Licencia', headerName: 'Licencia', width: 100 },
    { field: 'Vencimiento', headerName: 'Fecha Vencimiento', width: 150 },
    { field: 'Region', headerName: 'Region', width: 300 },
    { field: 'Comuna', headerName: 'Comuna', width: 100 },
  ];

  return (
    <div style={{ height: 800, width: '100%' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Listado de Licencias de Radio Aficionandos, vigentes al 26 de julio de 2024
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
      Fuente Subtel --
        <Link href="https://www.subtel.gob.cl/wp-content/uploads/2024/07/Informes_RA_26_07_2024_Novicio_General_Superior.xlsx" variant="body2">
          Link de Descarga
        </Link>
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={rowsPerPage}
        page={page}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
        rowsPerPageOptions={[100, 200, 300]}
        rowCount={rows.length}
      />
    </div>
  );
};

export default ListaRF;