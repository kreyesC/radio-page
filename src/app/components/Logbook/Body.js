import React from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const LogBook = () => {
  const logData = [
    {
      estacion: "CE5HKW",
      fecha: "8/9/2024",
      frecuencia: "A",
      horaCe: "9:46:21 p.m.",
      indicat: "CE5HKW",
      licencia: "8167-1",
      localidad: "Chiguayante",
      misSenales: 57,
      nombre: "AMIN GONZALEZ SERGIO ENRIQUE",
      observaciones: "Holaaa",
      susSenales: 57,
      tipoEmision: "SSB",
      utc: "00:46:21",
      vence: "15/4/2025"
    },
    {
      estacion: "CA7AJW",
      fecha: "8/9/2024",
      frecuencia: "A",
      horaCe: "9:46:41 p.m.",
      indicat: "CA7AJW",
      licencia: "24265-9",
      localidad: "Coyhaique",
      misSenales: 58,
      nombre: "AGUILAR DIAZ JUAN VICTOR",
      observaciones: "Holaaaaa2",
      susSenales: 56,
      tipoEmision: "FT8",
      utc: "00:46:41",
      vence: "22/6/2027"
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Log Book</Typography>
        <List>
          {logData.map((log, index) => (
            <ListItem key={index}>
              <Typography variant="body1">
                {log.estacion} - {log.fecha} - {log.tipoEmision} - {log.nombre}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LogBook;
