import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    // Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token, role } = response.data;
      return token && (localStorage.setItem("token", token), updateUser(response.data),
        role === "admin" ? navigate("/admin/dashboard") : navigate("/user/dashboard"));
    } catch (error) {
      return setError(error.response?.data?.message ? error.response.data.message : "Something went wrong. Please try again.");
    }
  };

  const formInput = () => {
    const formInputs = [
      { label: 'Email Address', placeholder: 'Enter your email here', type: 'text', value: email, onChange: setEmail },
      { label: 'Password', placeholder: 'Enter your password here', type: 'password', value: password, onChange: setPassword }
    ];
    return formInputs
      .map(({ label, placeholder, type, value, onChange }, index) => (
        <Input key={index} label={label} placeholder={placeholder} type={type} value={value} onChange={({ target }) => onChange(target.value)} />
      ));
  };

  return (
    <AuthLayout>
      <div className='lg:w-[50%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'> Welcome to the Portal </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'> Please enter your details to Login </p>
        <form onSubmit={handleLogin}>
          {formInput()}
          {error && <p className='text-red-500 text-xs pb-2.5'> {error} </p>}
          <button type='submit' className='btn-primary'> LOGIN </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account? &nbsp;
            <Link className='font-medium text-primary hover:underline' to="/signup"> Sign up </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login