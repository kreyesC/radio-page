import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Support = () => {
  const supportData = [
    {
      indicativo: "CE1MFL",
      operadores: "ALTAMIRANO ROJAS MARIO FERNANDO",
      sufijo: "MFL"
    },
    {
      indicativo: "CA7AJW",
      operadores: "AGUILAR DIAZ JUAN VICTOR",
      sufijo: "AJW"
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Apoyos</Typography>
        {supportData.map((support, index) => (
          <Typography key={index} variant="body1">
            Indicativo: {support.indicativo} - Operadores: {support.operadores} - Sufijo: {support.sufijo}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default Support;
