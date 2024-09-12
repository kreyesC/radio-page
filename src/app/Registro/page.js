'use client';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, firestore } from '../lib/firebase';
import styles from '../page.module.css';
import { collection, addDoc } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date();
      const docRef = await addDoc(collection(firestore, 'users'), {
        email,
        date
      });
      console.log('Documento agregado con ID: ', docRef.id);
      alert('Registrado Exitosamente')
      router.push('/DashboardHome');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={styles.main}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirma Contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Registro
            </Button>
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {'Ya tienes una cuenta? '}
            <Link href="/Login" variant="body2">
              Inicia Sesión
            </Link>
          </Typography>
        </Box>
      </Container>
    </main>
  );
}
