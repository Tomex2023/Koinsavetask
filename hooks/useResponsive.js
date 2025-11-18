import { useWindowDimensions } from "react-native";
import { BREAKPOINTS } from "../utils/breakpoints";

export default function useResponsive() {
  const { width } = useWindowDimensions();

  const isMobile = width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
  const isDesktop = width >= BREAKPOINTS.desktop;

  return { isMobile, isTablet, isDesktop, width };
}
