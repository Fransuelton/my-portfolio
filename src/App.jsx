import { createGlobalStyle } from "styled-components";
import { Header } from "./components/layout/header";
import { Main } from "./components/layout/main";
import { About } from "./components/layout/about";
import { Skills } from "./components/layout/skills";
import { Footer } from "./components/layout/footer";
import { Contact } from "./components/layout/contact";
import { Projects } from "./components/layout/projects";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

const GlobalStyle = createGlobalStyle`

:root {
  --primary-color: #121212;
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
  font-family: "Sora", sans-serif;
  list-style: none;
}

html {
  font-size: 62.5%;
}

a {
  color: #ffffff;
}

body {
  background-color: var(--primary-color);
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
