import { createGlobalStyle } from "styled-components";
import {
  Header,
  Main,
  About,
  Services,
  Footer,
  Contact,
  Projects,
} from "./components";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

const GlobalStyle = createGlobalStyle`

:root {
  --primary-color: #181818;
  --secondary-color: #222831;
  --tertiary-color: #008cff;
  --quaternary-color: #ffffff;
}

:root {
  --large-font-size: 4rem;
  --medium-font-size: 3.2rem;
  --small-font-size: 2rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Epilogue", sans-serif;
  list-style: none;
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

a {
  color: #ffffff;
}

body {
  background-color: #181818;
  max-width: 192rem;
  margin: 0 auto;
}

section,footer,header {
  margin: 0 2rem;
}


/* scroll bar */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--tertiary-color);
  border-radius: 20px;
}

`;

export default App;
