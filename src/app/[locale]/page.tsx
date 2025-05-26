'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/app/lib/store/useUserStore';
import _ from 'lodash';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { useRouter } from '@/app/lib/routing';

export default function HomePage() {
  const t = useTranslations();
  const [users, setUsers] = useState<any[]>([]);
  const { selectedUsers, toggleUser } = useUserStore();
  const router = useRouter();
  const cookies = useCookies();

  const currentLocale = cookies.get('NEXT_LOCALE') ?? 'en';

  function setLocale(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    router.refresh(); // ✅ Re-render without full reload
  }

  useEffect(() => {
    axios
      .get('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setUsers([{ name: 'AHHSHDhshd', age: 18, id: 1, email: 'test@gmail.com' }]);
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <main className="p-4">
      {/* Language toggle */}
      <div className="mb-4 flex gap-3">
        {['en', 'ro'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`border px-3 py-1 rounded ${
              currentLocale === lang ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'English' : 'Română'}
          </button>
        ))}
      </div>

      <h1 className="text-xl font-bold mb-4">{t('title')}</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex justify-between p-2 border rounded ${
              _.some(selectedUsers, { id: user.id }) ? 'bg-blue-100' : ''
            }`}
          >
            <div>
              {user.name} ({user.email}) — Age: {user.age ?? 'N/A'}
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => toggleUser(user)}
            >
              {_.some(selectedUsers, { id: user.id }) ? t('deselect') : t('select')}
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-lg font-semibold">{t('selected')}:</h2>
      <ul className="list-disc ml-6">
        {selectedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
