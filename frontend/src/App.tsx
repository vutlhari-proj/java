import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import { TextInput } from './components/textInput'
import eyeIcon from './assets/eye-icon.svg'
import { Home } from './pages/home'

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    console.log('Username:', username);
    console.log('Password:', password);
    // After successful login logic, navigate to home
    navigate('/home');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <TextInput label={true} name='username' type='text' required={true} />
      <TextInput label={true} name='password' type='password' image={{src: eyeIcon, alt: 'eye icon'}} required={true} />
      <button type='submit'>Submit</button>
    </form>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
