import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
export default function Layout() {
  return (
    <main className='App'>
      <Header />
      <Outlet />
    </main>
  )
}
