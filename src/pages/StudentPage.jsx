import { getUserFromToken } from '../utils/getUserFromToken';
import LogoutButton from '../components/LogoutButton';

export default function StudentPage() {
  const user = getUserFromToken();

  return (
    <div>
      <h2>👨‍🎓 Welcome, {user?.username || 'Student'}</h2>
      <LogoutButton />
    </div>
  );
}
