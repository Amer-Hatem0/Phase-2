// import { getUserFromToken } from '../utils/getUserFromToken';

// export default function AdminPage() {
//   const user = getUserFromToken();

//   return (
//     <div>
//       <h2>🛠️ Welcome, {user?.username || 'Admin'}</h2>
//       <LogoutButton />
//     </div>
//   );
// }

import LogoutButton from '../components/LogoutButton';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/schema';

export default function AdminPage() {
  const { data } = useQuery(GET_ME);
  return (
    <div>
      <h2>🛠️ Welcome, {data?.me?.username || 'Admin'}</h2>
      <LogoutButton />
    </div>
  );
}
