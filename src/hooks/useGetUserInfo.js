export const useGetUserInfo = () => {
  const { name, profilePhoto, userId, isAuth, jwtToken } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profilePhoto, userId, isAuth, jwtToken };
};
