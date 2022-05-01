import { AppProps } from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import HideAppBar from '../components/AppBar';
import Footer from '../components/Footer';
import Script from 'next/script';

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
        dark: "#22252e"
      }
    }
  });
  theme = responsiveFontSizes(theme);
  const googleAnalyticsTag = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG;

  return (
    <>
      <Script
        id="google2"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTag}`}
      />
      <Script id="google1" strategy="lazyOnload">
        {
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${googleAnalyticsTag}');
          `
        }
      </Script>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HideAppBar />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  )
}
