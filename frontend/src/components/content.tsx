import type React from "react";
import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";

export const Header = () => {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-xl">fileUploader</h1>
        <nav className="flex gap-4">
          <Link className="hover:underline" to="/login/">
            Login
          </Link>
          <Link className="hover:underline" to="/register/">
            Sign up
          </Link>
        </nav>
      </header>
    </>
  );
};

type Prop = {
  children: ReactNode;
};

export const Wrapper = ({ children }: Prop) => {
  return (
    <>
      <div className="flex h-full min-h-screen justify-center">{children}</div>
    </>
  );
};

export const Container = ({ children }: Prop) => {
  return (
    <>
      <div className="flex w-full max-w-xl flex-col gap-1 p-4">{children}</div>
    </>
  );
};

type LoginErrorsType = {
  username?: string;
  password?: string;
};

export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: LoginErrorsType = {};

    if (input.username === "") {
      errors.username = "cannot be blank";
    } else {
      errors.username = "";
    }

    if (input.password === "") {
      errors.password = "cannot be blank";
    } else {
      errors.password = "";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const onBlurUsername = async () => {
    const response = await fetch("/api/login/check-username/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: input.username }),
    });

    const { exists } = await response.json();

    const errors: LoginErrorsType = {};

    if (input.username === "") {
      errors.username = "cannot be blank";
    } else if (!exists) {
      errors.username = "username does not exist";
    } else {
      errors.username = "";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const onBlurPassword = () => {
    const errors: LoginErrorsType = {};

    if (input.password === "") {
      errors.password = "cannot be blank";
    } else {
      errors.password = "";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <Input
            error={error.username}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, username: e.target.value }))
            }
            value={input.username}
            onBlur={onBlurUsername}
            type="text"
            placeholder="username"
            label="username"
          />
          <Input
            error={error.password}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, password: e.target.value }))
            }
            value={input.password}
            onBlur={onBlurPassword}
            type="password"
            placeholder="password"
            label="password"
          />
        </div>
        <Button text="Login" />
      </Form>
    </>
  );
};

type RegisterErrorsType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

export const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/register/check-username/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: input.username }),
    });

    const { available } = await response.json();

    const errors: RegisterErrorsType = {};

    if (input.username === "") {
      errors.username = "cannot be blank";
    } else if (!available) {
      errors.username = "username is taken";
    }

    if (input.password === "") {
      errors.password = "cannot be blank";
    }

    if (input.confirmPassword === "") {
      errors.confirmPassword = "cannot be blank";
    } else if (input.password !== input.confirmPassword) {
      errors.confirmPassword = "passwords must match";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    try {
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: input.username,
          password: input.password,
          confirmPassword: input.confirmPassword,
        }),
      });

      if (response.ok) {
        setError({
          username: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      } else {
        setError({
          username: "server error",
          password: "server error",
          confirmPassword: "server error",
        });
      }
    } catch {
      setError({
        username: "server error",
        password: "server error",
        confirmPassword: "server error",
      });
    }
  };

  const onBlurUsername = async () => {
    const response = await fetch("/api/register/check-username/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: input.username }),
    });

    const { available } = await response.json();

    const errors: RegisterErrorsType = {};

    if (input.username === "") {
      errors.username = "cannot be blank";
    } else if (!available) {
      errors.username = "username is taken";
    } else {
      errors.username = "";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const onBlurPassword = () => {
    const errors: RegisterErrorsType = {};

    if (input.password === "") {
      errors.password = "cannot be blank";
    } else {
      errors.password = "";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  const onBlurConfirmPassword = () => {
    const errors: RegisterErrorsType = {};

    if (input.confirmPassword === "") {
      errors.confirmPassword = "cannot be blank";
    } else {
      errors.confirmPassword = "";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <Input
            error={error.username}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, username: e.target.value }))
            }
            value={input.username}
            onBlur={onBlurUsername}
            type="text"
            placeholder="username"
            label="username"
          />
          <Input
            error={error.password}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, password: e.target.value }))
            }
            value={input.password}
            onBlur={onBlurPassword}
            type="password"
            placeholder="password"
            label="password"
          />
          <Input
            error={error.confirmPassword}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            value={input.confirmPassword}
            onBlur={onBlurConfirmPassword}
            type="password"
            placeholder="confirm password"
            label="confirm password"
          />
        </div>
        <Button text="Sign up" />
      </Form>
    </>
  );
};

type InputProps = {
  label: string;
  placeholder: string;
  type: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string;
};

const Input = ({
  label,
  placeholder,
  type,
  onBlur,
  value,
  onChange,
  error,
}: InputProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={label}>{label}</label>
        <input
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          className={`${error !== "" ? "outline-red-600" : "outline-black"} p-1 outline`}
          placeholder={placeholder}
          type={type}
        />
        {error !== "" && <span>{error}</span>}
      </div>
    </>
  );
};

type ButtonProp = {
  text: string;
};

const Button = ({ text }: ButtonProp) => {
  return (
    <>
      <button className="cursor-pointer p-1 outline" type="submit">
        {text}
      </button>
    </>
  );
};

type FormProps = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      className="flex flex-col gap-4 p-4 outline"
      onSubmit={onSubmit}
      action="POST"
    >
      {children}
    </form>
  );
};

export const Upload = () => {
  const onSubmit = async () => {};

  return (
    <>
      <Form onSubmit={onSubmit}>
        <button></button>
        <input className="hidden" type="file" />
        <Button text="Upload" />
      </Form>
    </>
  );
};
