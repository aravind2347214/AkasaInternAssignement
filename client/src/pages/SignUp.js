import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardRounded, ReplayRounded, RestartAltRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  getUserDetailsFromToken,
  registerUser,
} from "../services/authServices";
import { useSelector } from "react-redux";
import ErrorBox from "../components/ErrorBox";
import APIResponseStatus from "../components/APIResponseStatus";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import { FruitLogo } from "../assets/Icons";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [registerStatus, setRegisterStatus] =
    useState("not-registered");
  const [apiResponseMessage, setApiResponseMessage] = useState("Something wrong happend");

  useEffect(() => {
    const existingUser = getUserDetailsFromToken();
    // console.log("EXISITING USER ID : ", existingUser);

    if (existingUser?._id) {
      navigate("/");
    }
  }, [navigate]);

  const retryRegister = () => {
    setRegisterStatus("not-registered");
  };
  const myProfiledata = useSelector(
    (state) => state.authReducer.myUserProfile
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    // Clear the timeout if the component unmounts or if there's a new error
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (myProfiledata?._id) {
      navigate("/");
    }
  }, [myProfiledata?._id, navigate]);

  const emptyState = {
    email: "", //
    password: "",
    fullName: "", //
    cpassword: "",
  };

  const [registerFormData, setRegisterFormData] =
    useState(emptyState);

  const handleInputChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateBeforeSubmit = () => {
    // console.log(registerFormData);

    if (
      !registerFormData.fullName ||
      !registerFormData.email ||
      !registerFormData.password ||
      !registerFormData.cpassword
    ) {
      setError("All fields are required");
      return false;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerFormData.email)) {
      setError("Invalid email format");
      return false;
    }

    if (registerFormData.password !== registerFormData.cpassword) {
      setError("Passwords do not match");
      return false;
    }

    // Check if the person is above 10
    if (registerFormData.age < 10) {
      setError("Age must be 10 or above");
      return false;
    }
    // Add more validation logic based on your requirements

    setError(null); // Reset error if validation passes
    return true;
  };

  const handleSubmit = async () => {
    // Add your validation logic here
    if (validateBeforeSubmit()) {
      setRegisterStatus("register-loading");
      // Perform registration logic here call API
      // console.log("Perform registration logic");
      await registerUser(registerFormData)
        .then((res) => {
          if (res.registerSuccess) {
            setRegisterStatus("register-success");
            setRegisterFormData(emptyState);
            navigate("/login");
          } else {
            console.error("ERROR ", res.response.data.error);
            setApiResponseMessage(res.response.data.error);
            setRegisterStatus("register-failure");
          }
          // console.log("Response : ", res);
        })
        .catch((err) => {
          setRegisterStatus("register-failure");
          setError(err.error);
          console.error("Error : ", err);
        });
    } else {
      // Display error message
      console.error("Validation failed. Display error message.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mx-auto  w-[450px] mt-[100px] gap-3 p-2">
        <div data-aos="fade-up" data-aos-duration="500" className="text-center">
        <div className='flex flex-col items-center'>
        <div className='scale-[400%] mb-10'>

       <FruitLogo/>
        </div>
       <Logo/>
        </div> 
        </div>
        {registerStatus === "not-registered" ? (
        <>
          <div
            data-aos="fade-up"
            data-aos-duration="550"
            className="flex flex-row gap-3"
          >
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={registerFormData.fullName}
              onChange={handleInputChange}
              className="flex-1 w-[80%] px-3 py-2 border border-transparent outline-none focus:border-purple bg-gray-100 rounded-[4px]"
              placeholder="Full Name"
            />
     
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            className="flex flex-row w-full gap-3"
          >
            <input
              name="email"
              id="email"
              value={registerFormData.email}
              onChange={handleInputChange}
              type="text"
              className='flex-1 px-3 py-2 bg-gray-100 border border-transparent outline-none focus:border-purple rounded-[4px]'              placeholder="Email"
            />
            
          </div>
         
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className='border-transparent border pr-1 items-center flex flex-row w-full bg-gray-100 rounded-[4px]  focus-within:border-purple'>
            <input
              name="password"
              id="password"
              autoComplete="off"
              value={registerFormData.password}
              onChange={handleInputChange}
              type={`${showPassword ? "text" : "password"}`}
              className="flex-1 px-3 py-2 bg-gray-100 outline-none rounded-[3px] "
              placeholder="Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center hover:bg-gray-200 p-[6px] rounded-full"
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: 20, color: "#9ca3af" }} />
              ) : (
                <Visibility sx={{ fontSize: 20, color: "#9ca3af" }} />
              )}
            </button>
          </div>
          <input
            data-aos="fade-up"
            data-aos-duration="750"
            name="cpassword"
            id="cpassword"
            autoComplete="off"
            value={registerFormData.cpassword}
            onChange={handleInputChange}
            type="password"
            className='px-3 py-2 bg-gray-100 border rounded-[4px] border-transparent outline-none focus:border-purple'
            placeholder="Confirm Password"
          />

          <button
            data-aos="fade-up"
            data-aos-duration="800"
            onClick={handleSubmit}
            className=" my-[10px] px-8 py-2 font-semibold w-fit mx-auto text-[#fff] bg-orange rounded-[4px] "
          >
            Sign Up
          </button>
          <div
          data-aos="fade-up"
          data-aos-duration="850"
          className="text-center text-[11px]"
        >
          Already Have an Account?{" "}
          <Link className="hover:underline text-purple font-semi" to="/login">
            Login
          </Link>
        </div>

        {error ? (
                // Section to implement the logic for validation
                <ErrorBox message={error} />
              ) : null}
    
        </>):
        registerStatus === "register-success" ? (
          <div className="mt-20">
            <APIResponseStatus
              status={true}
              message={"User Registered Successfully"}
            />
            <div className="flex justify-center gap-4 mt-10">
              <button
                className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5 flex flex-row items-center gap-1`}
                onClick={retryRegister}
              >
                <RestartAltRounded sx={{fontSize:18}}/>
                <span>
                Register Again
                </span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5 flex flex-row items-center gap-1`}
              >
                <span>Go To Login</span>
                <ArrowForwardRounded sx={{fontSize:18}}/>
              </button>
            </div>
          </div>
        ) : 
        registerStatus === "register-failure" ? (
          <div className="mt-20">
            <APIResponseStatus
              status={false}
              message={apiResponseMessage}
            />
            <div className="flex justify-center gap-4 mt-10">
              <button
                className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5 flex flex-row items-center gap-1`}
                onClick={retryRegister}
              >
                <ReplayRounded  sx={{fontSize:18}}/>
                <span>Try Again</span>
                
              </button>
            </div>
          </div>
        ) : registerStatus === "register-loading" ? (
          <div className="flex justify-center mt-[110px] text-[16px] font-light text-C11 ">
            <div className="flex flex-col mx-auto  gap-[20px]">
            <div className="flex justify-center">
            <Loader/>
            </div>
            <div >{`Registering you ${registerFormData.fullName.split(" ")[0]}`}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SignUp
