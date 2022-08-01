export interface User {
  id: number;
  storeId: number;
  name: string;
  isAdmin: boolean;
}

export function initUser(): User {
  return {
    id: 1,
    storeId: 1,
    name: "foo",
    isAdmin: false,
  };
}

export async function GetMine(): Promise<User> {
  return initUser();
}
