import { Header, Wrapper, Container } from "./components/content";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Wrapper>
        <Container>
          <Header />
          <Outlet />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
