let storedData;
let storedRole;

export const setData = (token) => {
  sessionStorage.setItem("Token", token);
};

export const getRoute = () => {
  return storedRole || null;
};

export const setInformationData = (data, role) => {
  storedData = data;
  storedRole = role;
};

export const getInformationData = () => {
  return {
    id: storedData?.id || null,
    name: storedData?.name || null,
    email: storedData?.email || null,
    bio: storedData?.bio || null,
    address: storedData?.address || null,
    gender: storedData.gender || null,
    age: storedData?.age || null,
    status: storedData?.status || null,
    contact: storedData?.contact || null,
    role: storedRole || null,
    photo: storedData?.photo || null,
    type: storedData?.type || null,
    license: storedData?.license || null,
    experience: storedData?.experience || null,
    service_fee: storedData?.service_fee || null,
  };
};
export const removeAuthentication = () => {
  sessionStorage.removeItem("Token");
  sessionStorage.removeItem("Data");
  storedData = null;
  storedRole = null;
};
