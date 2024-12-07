import styles from "./NewSong.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbumsForAccount } from "../../redux/albumSlice";
import { fetchTypes } from "../../redux/typeSilce";
import { addSong } from "../../redux/songSlice.js";
function NewSong() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAlbumsForAccount());
    dispatch(fetchTypes());
  }, [dispatch]);
  const types = useSelector((state) => state.types.types);
  const albums = useSelector((state) => state.albums.albums);
  const [formData, setFormData] = useState({
    name_song: '',
    lyrics: '',
    description: '',
    id_type: '',
    id_album: '',
    feat: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSong(formData));
    navigate("/account/artist/new-song-2");
    console.log(formData);
  };

  return (
    <>
      <h1>Honor the arts,</h1>
      <h1>Time to create and inspire</h1>
      <div className={styles.container}>
        <Link to="../artist">
          <img src="../../assets/icons/return.svg" alt="Return" />
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name_song">Song Name</label>
          <input
            type="text"
            id="name_song"
            name="name_song"
            value={formData.name_song}
            onChange={handleChange}
          />
          <label htmlFor="id_type">Type</label>
          <select
            id="id_type"
            name="id_type"
            value={formData.id_type}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            {types.map((type, index) => (
              <option key={index} value={type._id}>
                {type.name_type}
              </option>
            ))}
          </select>

          <label htmlFor="id_album">Album</label>
          <select
            id="id_album"
            name="id_album"
            value={formData.id_album}
            onChange={handleChange}
          >
            <option value="">Select Album</option>
            {albums.map((album, index) => (
              <option key={index} value={album._id}>
                {album.name_album}
              </option>
            ))}
          </select>

          <label htmlFor="description">Descriptions</label>
          <textarea
            name="description"
            id="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="lyrics">Lyrics</label>
          <textarea
            name="lyrics"
            id="lyrics"
            required
            rows={30}
            value={formData.lyrics}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Next</button>
        </form>
      </div>
    </>
  );
}

export default NewSong;
