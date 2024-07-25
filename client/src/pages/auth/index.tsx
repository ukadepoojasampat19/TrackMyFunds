import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import "./auth_t.css";
import { Navigate } from 'react-router-dom';
export const Auth = () => {
    console.log("Auth");
    return(
        <div className="sign-in-container">
            
            <div className='login'>
            <SignedOut>
            
                <SignUpButton mode="modal" />
                <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
                <Navigate to ="/dashboard"></Navigate>
            </SignedIn>
            </div>
        </div>
    );
};