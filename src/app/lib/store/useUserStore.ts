import { create } from 'zustand';
import { Users } from '@prisma/client';

interface UserState {
  selectedUsers: Users[];
  toggleUser: (user: Users) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  selectedUsers: [],
  toggleUser: (user) => {
    const isSelected = get().selectedUsers.some((u) => u.id === user.id);
    set({
      selectedUsers: isSelected
        ? get().selectedUsers.filter((u) => u.id !== user.id)
        : [...get().selectedUsers, user],
    });
  },
}));
