import type React from "react";
import { useState, type ReactNode } from "react";
import { Link, useNavigate, useOutletContext } from "react-router";
import { Upload, File } from "lucide-react";

type HeaderProps = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ loggedIn, setLoggedIn }: HeaderProps) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("/api/logout/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setLoggedIn(false);
        navigate("/");
      }
    } catch {
      console.log("failed to logout");
    }
  };

  return (
    <header className="flex justify-between">
      <h1 className="text-xl">fileUploader</h1>
      <nav className="flex items-center gap-4">
        {loggedIn ? (
          <>
            <Link className="hover:underline" to="/files/">
              Files
            </Link>
            <button className="cursor-pointer hover:underline" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:underline" to="/login/">
              Login
            </Link>
            <Link className="hover:underline" to="/register/">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
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

type OutletType = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
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
  const navigate = useNavigate();
  const { setLoggedIn } = useOutletContext<OutletType>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    }

    if (input.password === "") {
      errors.password = "cannot be blank";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: input.username,
          password: input.password,
        }),
      });

      if (response.ok) {
        setInput({
          username: "",
          password: "",
        });
        setLoggedIn(true);
        navigate("/");
        return;
      }

      if (response.status === 401) {
        setError((prev) => ({ ...prev, password: "incorrect password" }));
      }
    } catch {
      setError({
        username: "server error",
        password: "server error",
      });
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
    } else if (input.password.length < 8) {
      errors.password = "password must be 8 letters or more";
    }

    if (input.confirmPassword === "") {
      errors.confirmPassword = "cannot be blank";
    } else if (input.confirmPassword.length > 8) {
      errors.confirmPassword = "password must be 8 letters or more";
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
    } else if (input.password.length < 8) {
      errors.password = "password must be 8 letters or more";
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
    } else if (input.confirmPassword.length < 8) {
      errors.confirmPassword = "password must be 8 letters or more";
    } else if (input.password !== input.confirmPassword) {
      errors.confirmPassword = "passwords must match";
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

type UploadOutletType = {
  loggedIn: boolean;
};

export const UploadFile = () => {
  const [file, setFile] = useState(false);
  const { loggedIn } = useOutletContext<UploadOutletType>();
  const onSubmit = async () => {};
  return (
    <>
      {loggedIn ? (
        <Form onSubmit={onSubmit}>
          {file ? (
            <button className="flex p-4 outline">
              <Upload />
            </button>
          ) : (
            <div className="flex justify-center p-4 outline">
              <File />
            </div>
          )}

          <input className="hidden" type="file" />
          <Button text="Upload" />
        </Form>
      ) : (
        <div className="flex flex-col gap-4 p-4 outline">
          <Link className="flex justify-center p-4 outline" to="/login/">
            <Upload />
          </Link>
          <Link className="p-1 text-center outline" to="/login/">
            Upload
          </Link>
        </div>
      )}
    </>
  );
};

export const Files = () => {
  return <></>;
};
