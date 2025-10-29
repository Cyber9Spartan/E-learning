
import { useAppSelector } from '@/redux/hooks';

export const useAuth = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  return { user, token, isAuthenticated: !!token };
};
