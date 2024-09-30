import PropTypes from "prop-types";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1 Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //3 if there is no authenticated user,redirect to the /login page

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //2 while loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4 if there is user, render (show) the app
 if(isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
