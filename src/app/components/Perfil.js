'use client'
import { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from '../lib/firebase';
import { setDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useCombinedContext } from '../contex/RFContext';

export default function Perfil() {
  const { lic } = useCombinedContext();
  const [data, setData] = useState();
  const [perfil, setPerfil] = useState({
    email: '',
    rut: '',
    nombre: '',
    indicativo: '',
    linkQRZ: '',
    licencia: '',
    fechaVencimiento: '',
    comuna: '',
    region: '',
    prograna:''
  });

  useEffect(() => {
    setData(lic);
  }, [lic]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setPerfil((prev) => ({
          ...prev,
          email: email
        }));

        const q = query(collection(firestore, 'users'), where('email', '==', user.email));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const userData = docSnap.data();
          setPerfil((prev) => ({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buscarPorIndicativo = () => {
    if (perfil.indicativo) {
      const datosLicencia = data.find((dato) => dato.Indicativo === perfil.indicativo);
      if (datosLicencia) {
        setPerfil((prev) => ({
          ...prev,
          rut: datosLicencia.Rut,
          nombre: datosLicencia.Nombre,
          licencia: datosLicencia.Licencia,
          linkQRZ: `https://www.qrz.com/db/${perfil.indicativo}`,
          fechaVencimiento: datosLicencia.Vencimiento,
          comuna: datosLicencia.Comuna,
          region: datosLicencia.Region,
        }));
      } else {
        console.log("No se encontró ningún perfil con ese indicativo.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      buscarPorIndicativo();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const q = query(collection(firestore, 'users'), where('email', '==', perfil.email));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          ...perfil
        });

        alert('Datos guardados correctamente');


      } else {

        await setDoc(docRef, perfil);
        console.log('Nuevo usuario creado y datos guardados en Firestore:', perfil);
      }
    } catch (error) {
      console.error("Error guardando los datos: ", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Perfil del Radioaficionado
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={perfil.email}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Indicativo"
                name="indicativo"
                value={perfil.indicativo}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="RUT"
                name="rut"
                value={perfil.rut}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={perfil.nombre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Licencia"
                name="licencia"
                value={perfil.licencia}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fecha de Vencimiento"
                name="fechaVencimiento"
                value={perfil.fechaVencimiento}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Comuna"
                name="comuna"
                value={perfil.comuna}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Región"
                name="region"
                value={perfil.region}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Programa"
                name="programa"
                value={perfil.programa}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" align="center" gutterBottom>
                Perfil QRZ : {perfil.linkQRZ}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
