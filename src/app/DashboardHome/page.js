import styles from "../page.module.css";
import DashboardLayout from "../components/DashboardLayout";
import { Grid } from '@mui/material';
import { DataProvider, LicenciaProvider, UserProvider } from '../contex/RFContext';


export default function DashboardHome() {
  return (
    <UserProvider>
    <LicenciaProvider>
    <DataProvider>
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
    <div className={styles.containerDiv}>

        <h1>aqui el contenido de cada perfil</h1>
    </div>
    </Grid>
      </Grid>
    </DashboardLayout>
    </DataProvider>
    </LicenciaProvider>
    </UserProvider>
  );
}
