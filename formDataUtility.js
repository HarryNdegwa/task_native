const createFormData = (photo, body) => {
  const data = new FormData();

  delete body.profile;

  if (photo) {
    data.append("profile", photo);
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default createFormData;
