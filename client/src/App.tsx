
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, useAuth, UserButton } from '@clerk/clerk-react';

import img from './images/tracker.jpg';

function App() {

  const { isSignedIn } = useAuth()


  return (


    <Router>
      <div className="app-container">
        <div className='navbar'>
          <p className='title'>
            Funds Tracker
          </p>
          <SignedIn>
            <UserButton showName afterSignOutUrl="/dashboard" />
          </SignedIn>
        </div>
        <Routes>
          <Route path="/dashboard" element={  // all the componest in dashboard will have acces to record provider componenets
            <FinancialRecordsProvider>

              {isSignedIn ? <Dashboard /> : <Navigate to="/" />}
            </FinancialRecordsProvider>} />
          <Route path="/" element={
            <div style={{ backgroundImage: `url(${img})` }} className='app-container' >
              <Auth />
            </div>

          } />
        </Routes>
      </div>
    </Router>



  );
}

export default App
