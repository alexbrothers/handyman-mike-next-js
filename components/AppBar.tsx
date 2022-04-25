import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Box, Container, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

interface PageLink {
  name: string,
  link: string,
}

interface Props {
  children: React.ReactElement;
}

const pages: PageLink[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Work",
    link: "/work",
  },
  {
    name: "Reviews",
    link: "/reviews",
  },
  {
    name: "Contact",
    link: "/contact",
  }
]

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar position="fixed" component="header" color="inherit">
          <Container>
            <Toolbar sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: {
                  md: "0px"
              },
              paddingRight: {
                  md: "0px"
              },
              paddingTop: "10px",
              paddingBottom: "10px"
            }}>
              <Box sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                flexDirection: "row",
                alignItems: "center",
                columnGap: "10px",
              }}>
                <Image
                    src="/handyman_mike_logo_light.png"
                    alt="Handyman Mike Logo"
                    width="79.81"
                    height="64"
                />
                <Typography variant="h5">
                    Handyman Mike, LLC
                </Typography>
              </Box>
              <Box component="nav" sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                justifyContent: "center",
                alignItems: "center",
                columnGap: "50px",
                "a": {
                  color: "text.primary",
                  textDecoration: "none",
                },
                "a:hover": {
                  textDecoration: "underline",
                }
              }}>
                {pages.map(page => (
                  <Link key={page.name} href={page.link}>
                    <a>{page.name}</a>
                  </Link>
                ))}
              </Box>
              <Box sx={{
                display: {
                  xs: "flex",
                  md: "none",
                }
              }}>
                <Image
                    src="/handyman_mike_logo_light.png"
                    alt="Handyman Mike Logo"
                    width="79.81"
                    height="64"
                />
              </Box>
              <Box sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}>
                <IconButton
                  size="large"
                  aria-label="hamburger menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{fontSize: "35px"}}/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <Box component="nav" sx={{
                    "a": {
                      color: "text.primary",
                      textDecoration: "none",
                    },
                    "a:hover": {
                      textDecoration: "underline",
                    }
                  }}>
                    {pages.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu} sx={{
                        textAlign: "center"
                      }}>
                        <Link href={page.link}>
                          <a>{page.name}</a>
                        </Link>
                      </MenuItem>
                    ))}
                  </Box>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar sx={{
          paddingTop: "10px",
          paddingBottom: "10px",
          backgroundColor: "red"
      }} 
      />
    </React.Fragment>
  );
}