import styles from './NewSongSecond.module.scss';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addSongAndImg } from "../../redux/songSlice";
function NewSongSecond() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileSong, setFileSong] = useState(null);
  const [selectedFileSong, setSelectedFileSong] = useState(null);
  const [fileImg, setFileImg] = useState(null);
  const [selectedFileImg, setSelectedFileImg] = useState(null);

  const handleFileSongChange = (e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {
      setFileSong(URL.createObjectURL(selectFile));
      setSelectedFileSong(selectFile);
    }
  };
  const handleFileImgChange = (e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {
      setFileImg(URL.createObjectURL(selectFile));
      setSelectedFileImg(selectFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addSongAndImg({ fileSong: selectedFileSong, fileImg: selectedFileImg }))
    await navigate('/account')
  };

  return (
    <>
      <h1>Honor the arts,</h1>
      <h1>Time to create and inspire</h1>
      <div className={styles.container}>
        <Link to="../artist/new-song">
          <img src="../../assets/icons/return.svg" alt="Return" />
        </Link>
        <form onSubmit={handleSubmit}>
          <div className={styles.fileInput}>
            <label htmlFor="song">Upload Song</label>
            <input
              type="file"
              id="song"
              name="song"
              onChange={handleFileSongChange}
            />
            <button type="button" className={styles.fileBtn}>
              {fileSong ? fileSong : "Choose Song"}
            </button>
          </div>
          <div className={styles.fileInput}>
            <label htmlFor="image">Upload Image </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileImgChange}
            />
            <button type="button" className={styles.fileBtn}>
              {fileImg ? fileImg : "Choose Image"}
            </button>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default NewSongSecond;
