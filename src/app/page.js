import styles from "./page.module.css";
import ButtonApp from './components/ButtonApp';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';

export default function Home() {
  const clubs = [
    { name: 'Club de Radioaficionados de Santiago', location: 'Santiago', contact: 'contacto@radio.cl', website: 'http://radio.cl' },
    { name: 'Club de Radioaficionados de Valparaíso', location: 'Valparaíso', contact: 'info@radio.cl', website: 'http://radio.cl' },
  ];
  
  return (
    <>
    <ButtonApp/>
    <Container>
      <Typography variant="h2" gutterBottom>
        Radioaficionados en Chile
      </Typography>
      <Grid container spacing={3}>
        {clubs.map((club, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{club.name}</Typography>
                <Typography color="textSecondary">{club.location}</Typography>
                <Typography color="textSecondary">Contacto: {club.contact}</Typography>
                <Button variant="contained" color="primary" href={club.website} target="_blank" rel="noopener noreferrer">
                  Visitar Sitio
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
      </>   
  );
}
