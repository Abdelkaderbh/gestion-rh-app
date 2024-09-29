import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import ImageLight from '../../assets/img/login-office.jpeg';
import ImageDark from '../../assets/img/create-account-office-dark.jpeg';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Label, Button, Input } from '@windmill/react-ui';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Logic de connexion
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src={ImageLight}
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src={ImageDark}
                            alt="Office"
                        />
                      
                    </div>
                    <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                            <form onSubmit={handleSubmit}>
                                <Label>
                                    <span className='font-semibold'>Email</span>
                                    <Input
                                        className="mt-1 border-2 border-gray-200 p-3"
                                        type="email"
                                        placeholder="john@doe.com"
                                        value={email}
                                        onChange={handleEmailChange}
                                        // Ajout de propriétés supplémentaires ou défauts nécessaires
                                        aria-label="Email input"
                                        valid={true} 
                                    />
                                </Label>

                                <Label className="mt-4">
                                    <span className='font-semibold'>Password</span>
                                    <Input
                                        className="mt-1 border-2 border-gray-200 p-3  focus:border-gray-200 focus:ring-0"
                                        type="password"
                                        placeholder="***************"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        aria-label="Password input"
                                        valid={true}
                                    />
                                </Label>
                                

                                <Button className="mt-4 p-3 bg-purple-600 text-white hover:bg-purple-700" block type="submit">
                                    Log in
                                </Button>
                            </form>

                            <hr className="my-8" />

                            <Button block className="p-3 text-gray-700 hover:bg-gray-200" layout="outline">
                                <GitHubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                Github
                            </Button>
                            <Button className="mt-4 p-3 text-gray-700 hover:bg-gray-200" block layout="outline">
                                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                Twitter
                            </Button>

                            <p className="mt-4">
                                <Link
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    to="/forgot-password"
                                >
                                    Forgot your password?
                                </Link>
                            </p>
                            <p className="mt-1">
                                <Link
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    to="/register"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
