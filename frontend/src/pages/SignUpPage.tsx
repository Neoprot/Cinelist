import React from 'react';
import SignUp from '../components/SignUp';

const SignUpPage: React.FC = () => {
    return (
        <div className='h-full'>
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <SignUp />
        </div>
    );
};

export default SignUpPage;
