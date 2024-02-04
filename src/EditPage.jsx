import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import { update } from "./userSlice";

const EditPage = (props) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.Bio);
  const [url, setUrl] = useState(user.avaUrl);
  const [theme, setTheme] = useState(user.themeColor);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);

    const updatedUser = {
      name: name,
      Bio: bio,
      avaUrl: url,
      themeColor: theme,
    };
    dispatch(update(updatedUser));
  };

  const { setEdit } = props;
  const userName = useSelector((state) => state.user.name);
  const userBio = useSelector((state) => state.user.Bio);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="edit-container">
          <button className="close">Save</button>
            <h1 className="edit-profile">Edit Profile</h1>
          <div className="input-container">
            <Input label="Display change" data={userName} setData={setName} />
            <Input inputType="textarea" classStyle="input-about" label="Bio" data={userBio} setData={setBio} />
          </div>

            <label htmlFor="file-input">Profile Picture</label>
            <div className="input-image-container">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="file-input"
            />
            {url && <img src={url} className="input-image" alt="" />}
            </div>


          <div className="theme-container">
            <label>Theme</label>
            <input type="color" className="theme-color" onChange={(e) => setTheme(e.target.value)} />
          </div>
        </section>
      </form>
    </>
  );
};

export default EditPage;
