
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const Colors = {
  // ### Primary
  Cyan: " hsl(180, 66%, 89%)",
  lightCyan: '	hsl(180, 60%, 72%)',
  DarkViolet: " hsl(357, 87%, 26%)",
  // ### Secondary
  Red: "hsl(0, 87%, 67%)",
  // ### Neutral
  Gray: "#0B666A",
  GrayishViolet: "hsl(257, 27%, 63%)",
  VeryDarkBlue: "hsl(255, 31%, 22%)",
  VeryDarkViolet: "hsl(260, 98%, 14%)",
};

let theme = createTheme({

  typography: {
    fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
    fontSize: 20,
  },
  palette: {
    primary: {
      //violate
      light: "#665981",
      main: "#3b3054",
      dark: "#14082b",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#70ffff",
      main: "#2acfcf",
      dark: "#009d9e",
      contrastText: "#232127",
    },

    text: {
      primary: Colors.VeryDarkBlue,
      secondary: Colors.GrayishViolet
    },
    whitePalette: {
      light: "#665981",
      main: "#ffffff",
      dark: "#14082b",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: '100rem'
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },

    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          color: Colors.GrayishViolet,
          fontWeight: 700,
          "&:hover": {
            backgroundColor: 'transparent',
            color: Colors.VeryDarkBlue
          }

        }
      },
      variants: [{
        props: { variant: 'cyan' },
        style: {
          backgroundColor: Colors.Cyan,
          color: '#fff',
          borderRadius: 50,
          padding: '0.5rem 1.5rem',
          "&:hover": {
            backgroundColor: Colors.lightCyan,
            color: '#fff'
          }

        }
      }],
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          width: "80rem",
          borderRadius: '0.7rem !important',

        },
        list: {
          backgroundColor: Colors.DarkViolet,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 0'
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
       root:{
        "&:hover": {
          backgroundColor: 'transparent'
        }
       }
      }
    }
  },
});

theme = responsiveFontSizes(theme,);
export default theme;