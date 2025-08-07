import { useEffect, useState } from "react";
import { Header, Wrapper, Container } from "./components/content";
import { Outlet } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const authenticate = async () => {
    try {
      const response = await fetch("/api/auth/status/", {
        credentials: "include",
      });
      const result = await response.json();
      setLoggedIn(result.loggedIn);
    } catch (error) {
      setLoggedIn(false);
      console.error(error);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <>
      <Wrapper>
        <Container>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Outlet context={{ loggedIn, authenticate }} />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
