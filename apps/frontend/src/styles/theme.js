export const brandColors = {
  inkBlack: '#14140F',
  matatuYellow: '#F2B705',
  paperWhite: '#FAF8F2',
  signalRed: '#E24313',
  fallbackRouteColor: '#78776f',
};

export const typography = {
  fonts: {
    display: "'Anton', sans-serif",
    body: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  styles: {
    displayXl: {
      fontFamily: "'Anton', sans-serif",
      fontSize: '48px',
      fontWeight: '400',
      lineHeight: '1.1',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    headlineLg: {
      fontFamily: "'Anton', sans-serif",
      fontSize: '32px',
      fontWeight: '400',
      lineHeight: '1.2',
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
    },
    headlineMd: {
      fontFamily: "'Anton', sans-serif",
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '1.2',
      textTransform: 'uppercase',
    },
    titleLg: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    bodyLg: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '1.5',
    },
    bodyMd: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    bodySm: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.4',
    },
    dataLg: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '1.2',
    },
    dataSm: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1.2',
    },
    labelCaps: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: '12px',
      fontWeight: '700',
      lineHeight: '1',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
};

export const spacing = {
  base: '4px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  liveryStripe: '6px',
  containerMax: '600px',
  navbarHeight: '64px',
};

export const lightTheme = {
  mode: 'light',
  colors: {
    ...brandColors,
    background: brandColors.paperWhite,
    onBackground: brandColors.inkBlack,
    surface: brandColors.paperWhite,
    onSurface: brandColors.inkBlack,
    surfaceVariant: '#e4e3d9',
    onSurfaceVariant: '#484740',
    primary: brandColors.inkBlack,
    onPrimary: brandColors.paperWhite,
    primaryContainer: brandColors.matatuYellow,
    onPrimaryContainer: brandColors.inkBlack,
    secondary: brandColors.matatuYellow,
    onSecondary: brandColors.inkBlack,
    secondaryContainer: '#fcc019',
    error: brandColors.signalRed,
    onError: brandColors.paperWhite,
    border: brandColors.inkBlack,
    outline: '#78776f',
    outlineVariant: '#c9c6bd',
    shadow: 'none',
  },
  borders: {
    width: '2px',
    style: 'solid',
    card: '2px solid #14140F',
    overlay: '4px solid #14140F',
    divider: '2px solid #14140F',
  },
  radii: {
    none: '0px',
    card: '0px',
    button: '0px',
    sheet: '0px',
    chip: '0px',
  },
  typography,
  spacing,
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    ...brandColors,
    background: brandColors.inkBlack,
    onBackground: '#e5e2da',
    surface: brandColors.inkBlack,
    onSurface: '#e5e2da',
    surfaceVariant: '#1c1c17',
    onSurfaceVariant: '#9c8f78',
    primary: brandColors.matatuYellow,
    onPrimary: brandColors.inkBlack,
    primaryContainer: brandColors.matatuYellow,
    onPrimaryContainer: brandColors.inkBlack,
    secondary: '#c8c6c1',
    onSecondary: brandColors.inkBlack,
    secondaryContainer: '#494945',
    error: brandColors.signalRed,
    onError: brandColors.paperWhite,
    border: '#262620',
    outline: '#9c8f78',
    outlineVariant: '#4f4633',
    glow: '0 0 12px rgba(242, 183, 5, 0.25)',
  },
  borders: {
    width: '1px',
    style: 'solid',
    card: '1px solid #262620',
    overlay: '1px solid #35352f',
    divider: '1px solid #262620',
  },
  radii: {
    none: '0px',
    card: '8px',
    button: '4px',
    sheet: '12px 12px 0 0',
    chip: '4px',
  },
  typography,
  spacing,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default lightTheme;
