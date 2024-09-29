import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import ImageLight from '../../assets/img/create-account-office.jpeg';
import ImageDark from '../../assets/img/create-account-office-dark.jpeg';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Input, Label, Button } from '@windmill/react-ui';

interface FormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string; 
}

const SignUp: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '' 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logique de soumission du formulaire ici
        console.log(form);
    };

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
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
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Create account
                            </h1>
                            <form onSubmit={handleSubmit}> 
                                <Label>
                                    <span className='font-semibold'>Username</span> 
                                    <Input 
                                        className="mt-1 border-2 border-gray-200 p-3" 
                                        type="text" 
                                        name="username" 
                                        value={form.username} 
                                        onChange={handleChange} 
                                        placeholder="john.doe" 
                                    />
                                </Label>
                                <Label>
                                    <span className='font-semibold'>Email</span>
                                    <Input 
                                        className="mt-1 border-2 border-gray-200 p-3" 
                                        type="email" 
                                        name="email" 
                                        value={form.email} 
                                        onChange={handleChange} 
                                        placeholder="john@doe.com" 
                                    />
                                </Label>
                                <Label className="mt-4">
                                    <span className='font-semibold'>Password</span>
                                    <Input 
                                        className="mt-1 border-2 border-gray-200 p-3" 
                                        name="password" 
                                        value={form.password} 
                                        onChange={handleChange} 
                                        placeholder="***************" 
                                        type="password" 
                                    />
                                </Label>

                                <Label className="mt-4">
                                    <span className='font-semibold'>Confirm password</span>
                                    <Input 
                                        className="mt-1 border-2 border-gray-200 p-3" 
                                        name="confirmPassword" // Ajout du name ici
                                        value={form.confirmPassword} // Lier à l'état
                                        onChange={handleChange} // Ajouter le gestionnaire d'événements
                                        placeholder="***************" 
                                        type="password" 
                                    />
                                </Label>

                                <Label className="mt-6" check>
                                    <Input type="checkbox" />
                                    <span className="ml-2">
                                        I agree to the <span className="underline">privacy policy</span>
                                    </span>
                                </Label>

                                <Button type="submit" block className="mt-4 p-3 bg-purple-600 text-white hover:bg-purple-700">
                                    Create account
                                </Button>
                            </form> 

                            <hr className="my-8" />

                            <Button className="p-3 text-gray-700 hover:bg-gray-200" block layout="outline">
                                <GitHubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                Github
                            </Button>
                            <Button  block className="mt-4 p-3 text-gray-700 hover:bg-gray-200" layout="outline">
                                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                Twitter
                            </Button>

                            <p className="mt-4">
                                <Link
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    to="/login"
                                >
                                    Already have an account? Login
                                </Link>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
