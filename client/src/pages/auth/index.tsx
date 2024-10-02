import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import "./auth_t.css";
import { Navigate } from 'react-router-dom';


export const Auth = () => {
   // console.log("Auth");
    return(
        <div className="sign-in-container">
            
            <div className='login'>
            <SignedOut>
            
                <SignUpButton mode="modal" />
                <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
                <div className = 'dashboard'>
                <Navigate to ="/dashboard"></Navigate>
                </div>
            </SignedIn>
            </div>
        </div>
    );
};

export default Auth;
