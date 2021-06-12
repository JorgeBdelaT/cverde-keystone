export const isAdmin = (user: { isAdmin: boolean }) => !!user?.isAdmin;
export const isLoggedIn = (user: { isAdmin: boolean }) => !!user;
