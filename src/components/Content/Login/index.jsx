import React from "react";
import { useFormik, Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogin } from "../../../features/login/loginSlice";
import Swal from "sweetalert2";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.login);
  const { login } = useSelector((store) => store.login);
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      dispatch(fetchLogin(data));
      setData(data);
    },
  });

  useEffect(() => {
    console.log(login);
    if (status === "error") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: login,
      });
    }
    if (status === "succeeded") {
      Swal.fire({
        icon: "success",
        title: "Congrats!",
        text: `Here your token: ${login}`
      });
    }
  }, [data, login, status]);

  return (
    <div>
      <Formik>
        <Form onSubmit={formik.handleSubmit} style={{ padding: 100 }}>
          <label htmlFor="email"></label>
          <Field
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email).toString()}
            style={{ margin: 3 }}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error" style={{ color: "red" }}>
              {formik.errors.email}
            </div>
          )}
          <label htmlFor="lastName"></label>
          <Field
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.password).toString()}
            style={{ margin: 3 }}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error" style={{ color: "red" }}>
              {formik.errors.password}
            </div>
          )}
          <button type="submit" style={{ margin: 3 }}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
