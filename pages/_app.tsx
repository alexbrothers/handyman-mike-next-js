import { AppProps } from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import HideAppBar from '../components/AppBar';

export default function App({ Component, pageProps }: AppProps) {

  let theme = createTheme({
    palette: {
      background: {
        paper: "#2a2d3a",
        default: "#2a2d3a",
      },
      text: {
        primary: "rgba(255, 255, 255, 0.87)",
        secondary: "rgba(255, 255, 255, 0.6)",
        disabled: "rgba(255, 255, 255, 0.38)",
      },
      primary: {
        main: "#F06500",
      }
    }
  });
  theme = responsiveFontSizes(theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HideAppBar />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  )
}
