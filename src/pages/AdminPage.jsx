import { getUserFromToken } from '../utils/getUserFromToken';
import LogoutButton from '../components/LogoutButton';

export default function AdminPage() {
  const user = getUserFromToken();

  return (
    <div>
      <h2>🛠️ Welcome, {user?.username || 'Admin'}</h2>
      <LogoutButton />
    </div>
  );
}
