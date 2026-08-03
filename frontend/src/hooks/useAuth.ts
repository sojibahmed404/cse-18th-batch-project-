import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout as logoutAction } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, token } = useSelector(
    (state: RootState) => state.auth
  );

  const logout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    token,
    logout,
  };
}
