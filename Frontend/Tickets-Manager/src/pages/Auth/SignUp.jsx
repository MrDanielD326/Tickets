import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle SignUp form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl ='';

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    setError("");

    // SignUp API call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName, email, password, adminInviteToken
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'> Create an Account </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'> Join us today by registering to the portal </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label="Full Name"
              placeholder="Enter your name here"
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <Input
              label="Email Address"
              placeholder="Enter your email here"
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Input
              label="Password"
              placeholder="Enter your password here"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Input
              label="Admin Invite Token"
              placeholder="Enter your token here"
              type="text"
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
            />
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'> {error} </p>}
          <button type='submit' className='btn-primary'> SIGN UP </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account? &nbsp;
            <Link className='font-medium text-primary hover:underline' to="/login"> Login </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp