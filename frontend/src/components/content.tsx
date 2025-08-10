import type React from "react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router";
import {
  Upload,
  File,
  Trash2,
  Download,
  Folder,
  ChevronRight,
  Pencil,
} from "lucide-react";

type HeaderProps = {
  setLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
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
            <Link to="/" className="hover:underline">
              Home
            </Link>
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
  authenticate: () => void;
  loggedIn: boolean;
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
  const { authenticate, loggedIn } = useOutletContext<OutletType>();

  useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn]);

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
        authenticate();
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

type RegisterOutletType = {
  loggedIn: boolean;
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
  const { loggedIn } = useOutletContext<RegisterOutletType>();

  useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn]);

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
    } else if (input.confirmPassword.length < 8) {
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
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState(false);
  const dragging = useRef(0);
  const inputRef = useRef(null);
  const { loggedIn } = useOutletContext<UploadOutletType>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (!file) {
      setError(true);
      return;
    }
    formData.append("file", file);

    try {
      const response = await fetch("/api/auth/upload/", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        setError(false);
        setFile(null);
      }
    } catch {
      console.log("error");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragging.current += 1;
    setDrag(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragging.current -= 1;
    if (dragging.current === 0) {
      setDrag(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragging.current = 0;
    setDrag(false);
    setFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      {loggedIn ? (
        <Form onSubmit={onSubmit}>
          {file !== null ? (
            <div className="flex flex-col items-center justify-center p-4 outline">
              <div className="flex w-full justify-end">
                <button
                  onClick={() => setFile(null)}
                  className="group cursor-pointer"
                >
                  <Trash2 className="group-hover:text-red-600" />
                </button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <File />
                <span> {file.name}</span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current.click()}
              onDragLeave={handleDragLeave}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`${error ? "outline-red-600" : "outline-black"} ${drag ? "bg-gray-400/20" : "bg-transparent"} flex cursor-pointer justify-center p-4 outline`}
            >
              <Upload />
            </button>
          )}

          <input
            ref={inputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            type="file"
          />
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

type FileOutletType = {
  loggedIn: boolean;
};

export const Files = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const { loggedIn } = useOutletContext<FileOutletType>();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch("/api/auth/files/", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      setFiles(data.files);
    };
    fetchFiles();
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch("/api/auth/folders/", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      setFolders(data.folders);
    };
    fetchFolders();
  }, []);

  const deleteFile = async (id: string) => {
    await fetch(`/api/auth/delete-file/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  return (
    <>
      <Link className="p-1 text-center outline" to="/new-folder/">
        New Folder
      </Link>
      <ul>
        {folders.map((i, index) => (
          <li key={index}>
            <Link to={`/folder/${i.id}`} className="group flex justify-between">
              <div className="flex gap-2">
                <Folder />
                <span>{i.folder_name}</span>
              </div>
              <ChevronRight className="group-hover:text-green-600" />
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-2">
        {files
          .filter((file) => file.folder_name === null)
          .map((i, index) => (
            <li className="flex justify-between gap-2" key={index}>
              <Link to={`/file/${i.id}`} className="flex gap-2">
                <File />
                <span>{i.file_original_name}</span>
              </Link>
              <nav className="flex gap-4">
                <a
                  href={`/api/auth/download-file/${i.id}`}
                  download
                  className="group cursor-pointer"
                >
                  <Download className="group-hover:text-blue-600" />
                </a>
                <Link className="group" to={`/file/${i.id}/edit/`}>
                  <Pencil className="group-hover:text-green-600" />
                </Link>
                <button
                  className="group cursor-pointer"
                  onClick={() => deleteFile(i.id)}
                >
                  <Trash2 className="group-hover:text-red-600" />
                </button>
              </nav>
            </li>
          ))}
      </ul>
    </>
  );
};

type NewFolderOutletType = {
  loggedIn: boolean;
};

export const NewFolder = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { loggedIn } = useOutletContext<NewFolderOutletType>();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login/");
    }
  }, [loggedIn]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "") {
      setError("cannot be blank");
      return;
    } else {
      setError("");
    }

    await fetch("/api/auth/new-folder/", {
      credentials: "include",
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: input }),
    });
    navigate("/files/");
  };

  const handleBlur = () => {
    if (input === "") {
      setError("cannot be blank");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="name"
          label="name"
          error={error}
          onBlur={handleBlur}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button text="Add folder" />
      </Form>
    </>
  );
};

type FileDetailOutletType = {
  loggedIn: boolean;
};

export const FileDetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useOutletContext<FileDetailOutletType>();

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(`/api/auth/file/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const result = await response.json();
      setData(result.file);
    };
    fetchFile();
  }, [id]);

  const deleteFile = async () => {
    await fetch(`/api/auth/file/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    navigate("/files/");
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <File />
          <div className="flex gap-2">
            <span>File name:</span>
            <span>{data?.file_original_name}</span>
          </div>
          <div className="flex gap-2">
            <span>File type:</span>
            <span>{data?.file_type}</span>
          </div>
          <div className="flex gap-2">
            <span>File size:</span>
            <span>{data?.file_size}</span>
          </div>
          <div className="flex gap-2">
            <span>Created at:</span>
            <span>{new Date(data?.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Link className="group" to={`/file/${id}/edit/`}>
            <Pencil className="group-hover:text-green-600" />
          </Link>
          <button className="group cursor-pointer" onClick={deleteFile}>
            <Trash2 className="group-hover:text-red-600" />
          </button>
        </div>
      </div>
      <a
        download
        className="p-1 text-center outline"
        href={`/api/auth/download-file/${id}/`}
      >
        Download
      </a>
    </>
  );
};

type FolderDetailOutletType = {
  loggedIn: boolean;
};

export const FolderDetail = () => {
  const [data, setData] = useState(null);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useOutletContext<FolderDetailOutletType>();

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchFolder = async () => {
      const response = await fetch(`/api/auth/folder/${id}`, {
        headers: { "content-type": "application/json" },
        credentials: "include",
        method: "GET",
      });
      const result = await response.json();
      setData(result.folder);
      setFiles(result.folder.files);
    };
    fetchFolder();
  }, [id]);

  const deleteFolder = async () => {
    await fetch(`/api/auth/delete-folder/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    navigate("/files/");
  };

  const deleteFile = async (id: number) => {
    await fetch(`/api/auth/delete-file/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    navigate(-1);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Folder />
            <span>{data?.folder_name}</span>
            <span>{new Date(data?.created_at).toLocaleString()}</span>
          </div>
          <div className="flex gap-4">
            <Link className="group" to={`/folder/${id}/edit/`}>
              <Pencil className="group-hover:text-green-600" />
            </Link>
            <button className="group cursor-pointer" onClick={deleteFolder}>
              <Trash2 className="group-hover:text-red-600" />
            </button>
          </div>
        </div>
        {files.length > 0 && (
          <>
            <span className="text-lg">Files</span>
            <ul className="flex flex-col gap-4">
              {files.map((i, index) => (
                <li className="flex justify-between" key={index}>
                  <Link className="flex gap-2" to={`/file/${i.id}`}>
                    <File />
                    <span>{i.file_original_name}</span>
                  </Link>
                  <nav className="flex gap-4">
                    <a
                      download
                      className="group"
                      href={`/api/auth/download-file/${i.id}`}
                    >
                      <Download className="group-hover:text-blue-600" />
                    </a>
                    <Link className="group" to={`/file/${i.id}/edit/`}>
                      <Pencil className="group-hover:text-green-600" />
                    </Link>
                    <button
                      onClick={() => deleteFile(i.id)}
                      className="group cursor-pointer"
                    >
                      <Trash2 className="group-hover:text-red-600" />
                    </button>
                  </nav>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

type EditFileOutletType = {
  loggedIn: boolean;
};

export const EditFile = () => {
  const [input, setInput] = useState("");
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState({
    name: null,
    id: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loggedIn } = useOutletContext<EditFileOutletType>();
  const { id } = useParams();

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/auth/file/${id}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      setInput(result.file.file_original_name ?? "");
      setFolder({
        id: result.file.folderId,
        name: result.file.folder_name,
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch("/api/auth/folders", {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      setFolders(result.folders);
    };
    fetchFolders();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/auth/file/${id}/edit/`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: input,
        folderId: folder.id,
        folderName: folder.name,
      }),
    });
    navigate("/files/");
  };

  const handleBlur = () => {
    if (input === "") {
      setError("cannot be blank");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          error={error}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          label="file name"
          placeholder="file name"
        />
        <Dropdown folder={folder} setFolder={setFolder} list={folders} />
        <Button text="Update" />
      </Form>
    </>
  );
};

type EditFolderOutletType = {
  loggedIn: boolean;
};

export const EditFolder = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loggedIn } = useOutletContext<EditFolderOutletType>();
  const { id } = useParams();

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login/");
    }
  }, [loggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/auth/folder/${id}`, {
        credentials: "include",
        headers: { "content-type": "application/json" },
        method: "GET",
      });
      const result = await response.json();
      setInput(result.folder.folder_name ?? "");
    };
    fetchData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/auth/folder/${id}/edit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: input }),
    });
    navigate("/files/");
  };

  const handleBlur = () => {
    if (input === "") {
      setError("cannot be blank");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          error={error}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          label="folder name"
          placeholder="folder name"
        />
        <Button text="Update" />
      </Form>
    </>
  );
};

type DropdownProps = {
  list: [];
  folder: { id: number | null; name: string | null };
  setFolder: React.Dispatch<
    React.SetStateAction<{ id: number | null; name: string | null }>
  >;
};

const Dropdown = ({ list, folder, setFolder }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (id: number, name: string) => {
    setFolder({ id, name });
    setOpen(false);
  };

  return (
    <div>
      <label htmlFor="folder">Folder</label>
      <div className="flex flex-col outline">
        <button
          type="button"
          className="w-full cursor-pointer p-1 text-center outline"
          onClick={() => setOpen(!open)}
        >
          {folder.name ?? "Select Folder"}
        </button>
        {open && (
          <ul className="divide-y">
            <li>
              <button
                className="cursor-pointer p-1 text-center"
                type="button"
                onClick={() => {
                  setFolder({ name: null, id: null });
                  setOpen(false);
                }}
              >
                Select Folder
              </button>
            </li>
            {list.map((i, index) => (
              <li key={index}>
                <button
                  className="cursor-pointer p-1 text-center"
                  type="button"
                  onClick={() => handleSelect(i.id, i.folder_name)}
                >
                  {i.folder_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
