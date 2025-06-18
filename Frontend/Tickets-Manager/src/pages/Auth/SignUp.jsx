import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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

    let profileImageUrl = '';

    // SignUp API call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName, email, password, adminInviteToken, profileImageUrl
      });

      const { token, role } = response.data;

      return token && (
        localStorage.setItem("token", token),
        updateUser(response.data),
        navigate("/login")
      )
    } catch (error) {
      console.log(error); // Log the error for debugging
      return error.response
        ? setError(error.response.data?.message
          ? error.response.data.message
          : "An error occurred while processing your request."
        )
        : setError(error.request
          ? "No response from the server. Please try again later."
          : "An error occurred while processing your request."
        )
    }
  };

  // Navigate to login on button click
  const handleLoginRedirect = () => navigate("/login");

  const formInput = () => {
    const formInputs = [
      { label: "Full Name", placeholder: "How should we call you, adventurer?", type: "text", value: fullName, onChange: setFullName },
      { label: "Email Address", placeholder: "Where can we send your quest updates?", type: "text", value: email, onChange: setEmail },
      { label: "Password", placeholder: "Create your secret passphrase", type: "password", value: password, onChange: setPassword },
      { label: "Admin Invite Token", placeholder: "Got a magic token? Enter it here!", type: "text", value: adminInviteToken, onChange: setAdminInviteToken }
    ];
    return formInputs
      .map(({ label, placeholder, type, value, onChange }, index) => (
        <Input key={index} label={label} placeholder={placeholder} type={type} value={value} onChange={({ target }) => onChange(target.value)} />
      ));
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'> Embark on Your Journey! </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'> Become part of our vibrant community - register now and unlock your productivity potential. </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {formInput()}
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'> {error} </p>}
          <button type='submit' className='btn-primary'> SIGN UP </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Already part of the adventure? &nbsp;
            <button type="button" className='font-medium text-primary hover:underline' onClick={handleLoginRedirect}>
              Continue your quest!
            </button>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp