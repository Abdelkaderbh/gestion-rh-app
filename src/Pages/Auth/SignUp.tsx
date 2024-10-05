import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageLight from "../../assets/img/create-account-office.jpeg";
import ImageDark from "../../assets/img/create-account-office-dark.jpeg";
import { Label, Button } from "@windmill/react-ui";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { signup } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await signup({
        name: form.username,
        email: form.email,
        password: form.password,
        role: "EMPLOYEE",
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center sm:max-h-[80vh] min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
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
                  <span className="font-semibold">Username</span>
                  <Input
                    className="mt-1 border-2 p-3 dark:text-gray-400"
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="john.doe"
                    autoComplete="off"
                  />
                </Label>
                <Label className="mt-2">
                  <span className="font-semibold">Email</span>
                  <Input
                    className="mt-1 border-2 p-3"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@doe.com"
                    autoComplete="off"
                  />
                </Label>
                <Label className="mt-2">
                  <span className="font-semibold">Password</span>
                  <Input
                    className="mt-1 border-2 p-3"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="***************"
                    type="password"
                    autoComplete="off"
                  />
                </Label>

                <Label className="mt-2">
                  <span className="font-semibold">Confirm password</span>
                  <Input
                    className="mt-1 border-2 p-3"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="***************"
                    type="password"
                    autoComplete="off"
                  />
                </Label>

                <Button
                  type="submit"
                  block
                  className="mt-4 p-3 bg-purple-800 text-white hover:bg-purple-700"
                >
                  Create account
                </Button>
              </form>

              <hr className="my-4 dark:border-gray-600" />

              <p className="mt-2">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-500 hover:underline"
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
