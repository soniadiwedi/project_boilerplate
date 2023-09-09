import React from 'react';

const EditProfile = ({
  userData,
  handleFormSubmit,
  setName,
  setEmail,
  setGender,
  setImage,
  name,
  email,
  gender,
  image,
}) => {
  return (
    <div>
      <h1>Edit Profile</h1>
      {userData && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {/* Add more fields as needed */}
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
