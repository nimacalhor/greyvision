import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isSmallScreen: boolean;
  isNormalScreen: boolean;
  isLargeScreen: boolean;
  isMobileOrTablet: boolean;
  isScreen: boolean;
}

const useDeviceType: () => DeviceType = function () {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs")),
    isTablet = useMediaQuery(theme.breakpoints.only("sm")),
    isSmallScreen = useMediaQuery(theme.breakpoints.only("md")),
    isNormalScreen = useMediaQuery(theme.breakpoints.only("lg")),
    isLargeScreen = useMediaQuery(theme.breakpoints.only("xl"));

  return {
    isMobile,
    isTablet,
    isSmallScreen,
    isNormalScreen,
    isLargeScreen,
    isMobileOrTablet: isMobile || isTablet,
    isScreen: isSmallScreen || isNormalScreen || isLargeScreen,
    isNotMobile: isTablet || isSmallScreen || isNormalScreen || isLargeScreen,
  };
};

export default useDeviceType;
