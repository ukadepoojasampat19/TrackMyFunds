
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, useAuth, UserButton } from '@clerk/clerk-react';



function App() {

    const {isSignedIn} =  useAuth()
    
    
  return (
    

    <Router>
      <div className="app-container">
        <div className='navbar'>
         
          <SignedIn>
                <UserButton showName afterSignOutUrl="/dashboard"/>
                

            </SignedIn>
        </div>
        <Routes>
          <Route path="/dashboard" element={  // all the componest in dashboard will have acces to record provider componenets
            <FinancialRecordsProvider>
              
              { isSignedIn ? <Dashboard /> : <Navigate to="/" /> }
            </FinancialRecordsProvider>} />
          <Route path="/"  element={<Auth />} />
        </Routes>
      </div>
    </Router>



  );
}

export default App
