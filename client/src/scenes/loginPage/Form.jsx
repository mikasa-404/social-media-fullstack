import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { setLogin } from "state";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("register");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch("/auth/register", {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    console.log(savedUser);
    if(savedUser){
      setPageType("login");
    }
  };
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("/auth/login",{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    });
    const loggedIn= await loggedInResponse.json();
    onSubmitProps.resetForm();
    if(loggedIn){
      dispatch(setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      }));
      navigate("/home");
    }

  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleReset,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Content for register page */}
            {isRegister && (
              <>
                <TextField
                  variant="outlined"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="firstName"
                  sx={{ gridColumn: "span 2" }}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="lastName"
                  sx={{ gridColumn: "span 2" }}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  variant="outlined"
                  label="Location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="location"
                  sx={{ gridColumn: "span 4" }}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
                <TextField
                  variant="outlined"
                  label="Occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="occupation"
                  sx={{ gridColumn: "span 4" }}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                />
                {/* picture drop box*/}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {/* this acceptedFiles will pe an array of objects containing properties like name, type,path  */}
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture here! </p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              variant="outlined"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              sx={{ gridColumn: "span 4" }}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              variant="outlined"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              sx={{ gridColumn: "span 4" }}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
