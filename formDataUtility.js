const createFormData = (photo, body) => {
  const data = new FormData();

  delete body.profile;

  data.append("profile", {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default createFormData;
