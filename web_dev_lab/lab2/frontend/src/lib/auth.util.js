export const logoutUser = async (userId) => {
  const url = import.meta.env.VITE_API_URL + `/auth/logout`;
  const req = await fetch(url, { method: "POST" });
  const res = await req.json();
  if (res.success) {
    localStorage.clear("token");
    localStorage.clear("id");
  }
  return res;
};
