const apiUrl = "https://localhost:5001";

export const login = (userObject) => {
    return fetch(`${apiUrl}/api/User/GetByEmail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          localStorage.setItem("user", JSON.stringify(user));
          return user
        }
        else{
          return undefined
        }
      });
  };

export const logout = () => {
    localStorage.clear()
};