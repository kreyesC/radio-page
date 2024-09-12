import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';

const Profile = ({profileData}) => {
console.log(profileData)
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Perfil</Typography>
        {/* <Typography variant="body1">Comuna: {profileData.Comuna}</Typography>
        <Typography variant="body1">Fecha: {profileData.Date}</Typography>
        <Typography variant="body1">Email: {profileData.Email}</Typography>
        <Typography variant="body1">Fecha de Vencimiento: {profileData.FechaVencimiento}</Typography>
        <Typography variant="body1">Indicativo: {profileData.Indicativo}</Typography>
        <Typography variant="body1">Licencia: {profileData.Licencia}</Typography>
        <Link href={profileData.LinkQRZ} target="_blank">Enlace QRZ</Link> */}
      </CardContent>
    </Card>
  );
};

export default Profile;
