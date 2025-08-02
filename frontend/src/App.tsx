import { useState } from "react";
import { Header, Wrapper, Container } from "./components/content";
import { Outlet } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Wrapper>
        <Container>
          <Header />
          <Outlet context={{ loggedIn }} />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
