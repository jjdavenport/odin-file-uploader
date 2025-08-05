import {
  Login,
  Register,
  UploadFile,
  Files,
  NewFolder,
} from "../components/content";

export const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export const RegisterPage = () => {
  return (
    <>
      <Register />
    </>
  );
};

export const HomePage = () => {
  return (
    <>
      <UploadFile />
    </>
  );
};

export const FilesPage = () => {
  return (
    <>
      <Files />
    </>
  );
};

export const FilePage = () => {
  return <></>;
};

export const NewFolderPage = () => {
  return (
    <>
      <NewFolder />
    </>
  );
};
