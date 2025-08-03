import { useState } from "react";
import { Header, Wrapper, Container } from "./components/content";
import { Outlet } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Wrapper>
        <Container>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Outlet context={{ loggedIn, setLoggedIn }} />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
