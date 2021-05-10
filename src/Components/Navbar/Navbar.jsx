import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logoPng from '../../Assets/logo.png'

const URLs = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'About',
    href: '/about',
  },
]

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#F7F7F9',
    paddingRight: '79px',
    paddingLeft: '118px',
    boxShadow: 'none !important',
    marginBottom: '60px',

    '@media (max-width: 900px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  logo: {
    height: '50px',
    justifySelf: 'end',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
    color: '#000',

    '&:hover': {
      color: '#FE3E57',
      cursor: 'pointer',
      transition: '.2s ease-in-out all',
    },
  },
  toolbar: {
    display: 'flex',

    justifyContent: 'space-between',
  },
  drawerContainer: {
    padding: '20px 30px',
  },
  navButton: {
    color: '#0B0A07',
    backgroundImage:
      'linear-gradient(transparent 50%, #FE3E57 ,#FE3E57 , #FE3E57 50%,#Ffffff44 100%)',
    backgroundSize: '1% 400%',
    transition: 'all ease-in-out 0.8s',

    '&:hover': {
      backgroundPosition: '0 -195%',
      color: 'white',
    },
  },
}))

export default function Navbar() {
  const {
    header,
    logo,
    menuButton,
    toolbar,
    drawerContainer,
    navButton,
  } = useStyles()
  const getMenuButtons = () => {
    return URLs.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: 'inherit',
            to: href,
            exact: true,
            component: NavLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      )
    })
  }
  const Logo = <img src={logoPng} alt="logo" className={logo} />

  const getDrawerChoices = () => {
    return URLs.map(({ label, href }) => {
      return (
        <Link
          {...{
            exact: true,
            component: NavLink,
            to: href,
            color: 'inherit',
            style: { textDecoration: 'none' },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      )
    })
  }
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  })

  const { mobileView, drawerOpen } = state

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState(prevState => ({ ...prevState, mobileView: true }))
        : setState(prevState => ({ ...prevState, mobileView: false }))
    }

    setResponsiveness()

    window.addEventListener('resize', () => setResponsiveness())
  }, [])

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <div> {Logo}</div>
        <div>{getMenuButtons()}</div>
        <Button className={navButton} variant="outlined" color="secondary">
          Let&apos;s Talk
        </Button>
      </Toolbar>
    )
  }

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState(prevState => ({ ...prevState, drawerOpen: true }))
    const handleDrawerClose = () =>
      setState(prevState => ({ ...prevState, drawerOpen: false }))

    return (
      <Toolbar className={toolbar}>
        <IconButton
          {...{
            edge: 'start',
            color: 'black',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',

            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{Logo}</div>
      </Toolbar>
    )
  }

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  )
}
