import {
  Login,
  Register,
  UploadFile,
  Files,
  NewFolder,
  FileDetail,
  FolderDetail,
  EditFolder,
  EditFile,
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
  return (
    <>
      <FileDetail />
    </>
  );
};

export const NewFolderPage = () => {
  return (
    <>
      <NewFolder />
    </>
  );
};

export const FolderPage = () => {
  return (
    <>
      <FolderDetail />
    </>
  );
};

export const FileEditPage = () => {
  return (
    <>
      <EditFile />
    </>
  );
};

export const FolderEditPage = () => {
  return (
    <>
      <EditFolder />
    </>
  );
};
