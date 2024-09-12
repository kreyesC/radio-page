'use client';
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    TableContainer,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCombinedContext } from '../contex/RFContext';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from '../lib/firebase';
import {  updateDoc, query, collection, where, getDocs } from 'firebase/firestore';


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 400,
    overflowX: 'auto',
}));

const StyledTable = styled(Table)(({ theme }) => ({
    fontSize: '0.875rem',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(0.5),
}));

const RadioLog = () => {
    const { lic } = useCombinedContext();
    const [data, setData] = useState([]);
    const [apoyos, setApoyos] = useState([]);
    const [nuevoApoyo, setNuevoApoyo] = useState({
        indicativo: '',
        estacion: '',
        operadores: '',
        comuna: '',
    });

    const [sufijos, setSufijos] = useState([]);
    const [sufijoSeleccionado, setSufijoSeleccionado] = useState('');
    const [sufijoApoyos, setSufijoApoyos] = useState([]);
    const [user, setUser] = useState('');

    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const email = user.email;
              setUser((prev) => ({
                ...prev,
                email: email
              }));
      
              const q = query(collection(firestore, 'users'), where('email', '==', user.email));
      
              const querySnapshot = await getDocs(q);
      
              if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const userData = docSnap.data();
                setUser((prev) => ({
                  ...prev,
                  ...userData
                }));
              } else {
                console.log("No hay datos para este usuario, campos vacíos.");
              }
            } else {
              console.log("No hay ningún usuario autenticado.");
            }
          });
    }, []);


    useEffect(() => {
        if (lic && lic.length > 0) {
            setData(lic);
            cargarSufijos();
        }
    }, [lic]);

    const cargarSufijos = () => {
        const nuevosSufijos = lic.map((dato) => dato.Indicativo.slice(-3));
        setSufijos([...new Set(nuevosSufijos)]);

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoApoyo({ ...nuevoApoyo, [name]: value });
    };

    const buscarPorIndicativo = () => {
        if (nuevoApoyo.indicativo) {
            const datosLicencia = data.find((dato) => dato.Indicativo === nuevoApoyo.indicativo);
            if (datosLicencia) {
                setApoyos((prevApoyos) => [
                    ...prevApoyos,
                    {
                        indicativo: nuevoApoyo.indicativo,
                        estacion: nuevoApoyo.indicativo,
                        operadores: datosLicencia.Nombre,
                        comuna: datosLicencia.Comuna,
                    },
                ]);
            } else {
                console.log('No se encontró ningún perfil con ese indicativo.');
            }
            setNuevoApoyo({ ...nuevoApoyo, indicativo: '' });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            buscarPorIndicativo();
        }
    };

    const eliminarApoyo = (index) => {
        const nuevosApoyos = apoyos.filter((_, i) => i !== index);
        setApoyos(nuevosApoyos);
    };

    const eliminarSufijo = (index) => {
        const nuevosSufijoApoyos = sufijoApoyos.filter((_, i) => i !== index);
        setSufijoApoyos(nuevosSufijoApoyos);
    };

    const handleSufijoChange = (e) => {
        setSufijoSeleccionado(e.target.value);
        buscarPorSufijo(e.target.value);
    };

    const buscarPorSufijo = (sufijo) => {
        const resultados = data.filter((dato) => dato.Indicativo.endsWith(sufijo));
        const nuevosSufijoApoyos = resultados.map((resultado) => ({
            sufijo: sufijo,
            indicativo: resultado.Indicativo,
            operadores: resultado.Nombre,
        }));

        setSufijoApoyos((prevSufijoApoyos) => [
            ...prevSufijoApoyos,
            ...nuevosSufijoApoyos,
        ]);
    };

    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString();
    };

    const clearFields = () => {
        setRows([
            {
                id: 1,
                fecha: getCurrentDate(),
                horaCe: getCurrentTime(),
                utc: getCurrentUTC(),
                indicat: '',
                estacion: '',
                nombre: '',
                frecuencia: '',
                tipoEmision: '',
                susSenales: '',
                misSenales: '',
                observaciones: '',
                localidad: '',
                licencia: '',
                vence: '',
            },
        ]);
        setApoyos([]);
        setNuevoApoyo({
            indicativo: '',
            estacion: '',
            operadores: '',
            comuna: '',
        });
        setSufijos([]);
        setSufijoSeleccionado('');
        cargarSufijos();
    };

    const saveData = async () => {
        try {
            const q = query(collection(firestore, 'users'), where('indicativo', '==', user.indicativo));
    
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                const existingData = querySnapshot.docs[0].data().logBook || []; // Obtener el logBook existente o un array vacío si no existe
                
                // Agregar el nuevo registro al logBook existente
                const newEntry = {
                    apoyos: apoyos,
                    sufijoApoyos: sufijoApoyos,
                    logbook: rows,
                    fecha: new Date()
                };
    
                await updateDoc(docRef, {
                    logBook: [...existingData, newEntry], // Combinar el logBook existente con el nuevo registro
                });
    
                alert('Datos guardados correctamente');
            } else {
                alert('No se encontró un proyecto con el requerimiento especificado');
            }
        } catch (error) {
            console.error("Error saving assignment: ", error);
            alert('Error al guardar los datos');
        }
    };
    

    const addRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            {
                id: prevRows.length + 1,
                fecha: getCurrentDate(),
                horaCe: getCurrentTime(),
                utc: getCurrentUTC(),
                indicat: '',
                estacion: '',
                nombre: '',
                frecuencia: '',
                tipoEmision: '',
                susSenales: '',
                misSenales: '',
                observaciones: '',
                localidad: '',
                licencia: '',
                vence: '',
            },
        ]);
    };
    const handleInputChangeField = (id, field, value) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const buscarPorIndicativo2 = (indicativo, rowIndex) => {
        if (indicativo) {
            const datosLicencia = data.find((dato) => dato.Indicativo === indicativo);
            if (datosLicencia) {
                setRows((prevRows) =>
                    prevRows.map((row, index) =>
                        index === rowIndex
                            ? {
                                ...row,
                                indicat: indicativo,
                                estacion: indicativo,
                                nombre: datosLicencia.Nombre,
                                localidad: datosLicencia.Comuna,
                                licencia: datosLicencia.Licencia,
                                vence: datosLicencia.Vencimiento,
                            }
                            : row
                    )
                );
            }
        }
    };
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString();
    };

    const getCurrentUTC = () => {
        const now = new Date();
        return now.toISOString().slice(11, 19);
    };

    const [rows, setRows] = useState([
        {
            id: 1,
            fecha: getCurrentDate(),
            horaCe: getCurrentTime(),
            utc: getCurrentUTC(),
            indicat: '',
            estacion: '',
            nombre: '',
            frecuencia: '',
            tipoEmision: '',
            susSenales: '',
            misSenales: '',
            observaciones: '',
            localidad: '',
            licencia: '',
            vence: '',
        },
    ]);

    return (
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
            <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold">
                    {user.programa}
                </Typography>
                <Typography variant="subtitle2">Programa Gentileza de {user.nombre}</Typography>
                <Typography variant="subtitle2">{`${dia}/${mes}/${anio}`}</Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e3f2fd' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Contactos
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {apoyos.length}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Apoyos
                        </Typography>
                        <TextField
                            fullWidth
                            label="Indicativo"
                            name="indicativo"
                            variant="outlined"
                            size="small"
                            value={nuevoApoyo.indicativo}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Sufijos
                        </Typography>
                        <FormControl fullWidth>
                            <Select
                                value={sufijoSeleccionado}
                                displayEmpty
                                onChange={handleSufijoChange}
                            >
                                <MenuItem value="" disabled>
                                    Selecciona un sufijo
                                </MenuItem>
                                {sufijos.map((sufijo, index) => (
                                    <MenuItem key={index} value={sufijo}>
                                        {sufijo}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e3f2fd' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Duplicados
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {sufijoApoyos.length}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Sección de tablas de apoyos y sufijos */}
            <Box sx={{ marginTop: 4, display: 'flex', gap: 2 }}>
                {/* Tabla de Apoyos */}
                <TableContainer component={Paper} sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Lista de Apoyos
                    </Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Indicativo</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Estación</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Operadores</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Comuna</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {apoyos.map((apoyo, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{apoyo.indicativo}</TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{apoyo.estacion}</TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{apoyo.operadores}</TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{apoyo.comuna}</TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>
                                        <IconButton size="small" onClick={() => eliminarApoyo(index)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Tabla de Sufijos */}
                <TableContainer component={Paper} sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Lista de Sufijos
                    </Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Sufijo</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Indicativo</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Operadores</TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sufijoApoyos.map((sufijoApoyo, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{sufijoApoyo.sufijo}</TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{sufijoApoyo.indicativo}</TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{sufijoApoyo.operadores}</TableCell>
                                    <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>
                                        <IconButton size="small" onClick={() => eliminarSufijo(index)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ marginTop: 4, display: 'flex', gap: 2 }}>
            </Box>
            <Box>
                <StyledTableContainer component={Paper}>
                    <StyledTable aria-label="editable table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Fecha</StyledTableCell>
                                <StyledTableCell>Hora CE</StyledTableCell>
                                <StyledTableCell>UTC</StyledTableCell>
                                <StyledTableCell>Indicativo</StyledTableCell>
                                <StyledTableCell>Estación</StyledTableCell>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell>Frecuencia A M H Z</StyledTableCell>
                                <StyledTableCell>Tipo de Emisión</StyledTableCell>
                                <StyledTableCell>Sus Señales</StyledTableCell>
                                <StyledTableCell>Mis Señales</StyledTableCell>
                                <StyledTableCell>Observaciones</StyledTableCell>
                                <StyledTableCell>Localidad</StyledTableCell>
                                <StyledTableCell>Licencia</StyledTableCell>
                                <StyledTableCell>Vence</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="body2">{row.fecha}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="body2">{row.horaCe}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="body2">{row.utc}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            value={row.indicat}
                                            onChange={(e) => handleInputChangeField(row.id, 'indicat', e.target.value)}
                                            onBlur={() => buscarPorIndicativo2(row.indicat, row.id - 1)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{row.estacion}</StyledTableCell>
                                    <StyledTableCell>{row.nombre}</StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            value={row.frecuencia}
                                            onChange={(e) => handleInputChangeField(row.id, 'frecuencia', e.target ? e.target.value : '')}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            variant="outlined"
                                            size="small"
                                            value={row.tipoEmision}
                                            onChange={(e) => handleInputChangeField(row.id, 'tipoEmision', e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value="SSB">SSB</MenuItem>
                                            <MenuItem value="FT8">FT8</MenuItem>
                                        </Select>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            variant="outlined"
                                            size="small"
                                            value={row.susSenales}
                                            onChange={(e) => handleInputChangeField(row.id, 'susSenales', e.target.value)}
                                            displayEmpty
                                        >
                                            {[55, 56, 57, 58, 59].map((signal) => (
                                                <MenuItem key={signal} value={signal}>
                                                    {signal}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            variant="outlined"
                                            size="small"
                                            value={row.misSenales}
                                            onChange={(e) => handleInputChangeField(row.id, 'misSenales', e.target.value)}
                                            displayEmpty
                                        >
                                            {[55, 56, 57, 58, 59].map((signal) => (
                                                <MenuItem key={signal} value={signal}>
                                                    {signal}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            value={row.observaciones}
                                            onChange={(e) => handleInputChangeField(row.id, 'observaciones', e.target.value)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{row.localidad}</StyledTableCell>
                                    <StyledTableCell>{row.licencia}</StyledTableCell>
                                    <StyledTableCell>{row.vence}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </StyledTableContainer>
                <IconButton color="primary" onClick={addRow}>
                    <AddIcon /> Agregar más filas
                </IconButton>
                <Button variant="contained" color="secondary" onClick={clearFields} style={{ marginLeft: '10px' }}>
                    Limpiar
                </Button>
                <Button variant="contained" color="primary" onClick={saveData} style={{ marginLeft: '10px' }}>
                    Guardar
                </Button>
            </Box>
        </Paper>
    );
};

export default RadioLog;
