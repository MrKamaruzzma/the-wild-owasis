import ButtonIcon from "../../ui/ButtonIcon"; // Custom ButtonIcon component
import { HiArrowRightOnRectangle } from "react-icons/hi2"; // Logout icon from react-icons
import { useLogout } from "./useLogout"; // Custom hook to handle logout functionality
import SpinnerMini from "../../ui/SpinnerMini"; // Custom mini loading spinner component

function Logout() {
  // Destructure logout function and isLoading state from the useLogout hook
  const { logout, isLoading } = useLogout();

  return (
    // ButtonIcon component with an onClick handler to trigger the logout function
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {/* Show the logout icon if not loading, otherwise show the loading spinner */}
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
