import type React from "react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";

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

export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onBlurUsername = () => {};

  const onBlurPassword = () => {};

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <Input
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

export const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onBlurUsername = () => {};

  const onBlurPassword = () => {};

  const onBlurConfirmPassword = () => {};

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <Input
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
};

const Input = ({
  label,
  placeholder,
  type,
  onBlur,
  value,
  onChange,
}: InputProps) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={label}>{label}</label>
        <input
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          className="p-1 outline"
          placeholder={placeholder}
          type={type}
        />
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
