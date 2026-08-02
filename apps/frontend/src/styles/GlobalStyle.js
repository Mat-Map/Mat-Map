import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    min-height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.onBackground};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fonts.display};
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.01em;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }

  input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border: none;
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Accessibility focus ring fallback */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.matatuYellow};
    outline-offset: 2px;
  }
`;

export default GlobalStyle;
