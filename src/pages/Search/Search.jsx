import GenreCard from '../../Components/GenreCard/GenreCard'
import styles from './Search.module.scss'
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchAlbums } from "../../redux/albumSlice";
import { setCurrentAlbum } from '../../redux/songSlice';
import { useNavigate } from "react-router-dom";
import { setCurrentSong, fetchSongsFromEmotions } from "../../redux/songSlice";
import { fetchTypes } from "../../redux/typeSilce";
import SongContainer from "../../Components/SongContainer/SongContainer.jsx";
function Search() {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const albums = useSelector((state) => state.albums.albums);
  const songs = useSelector((state) => state.songs.songs);
  const artists = useSelector((state) => state.artists.artists);
  const types = useSelector((state) => state.types.types);
  const firstSong = songs && songs.length > 0 ? songs[0] : null;
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const messageEndRef = useRef(null);

  const ratingElement = (
    <div className={`${styles.rating} ${styles.answer}`}>
      <p>Are you satisfied?</p>
      <input value="5" name="rate" id="star5" type="radio" />
      <label title="text" htmlFor="star5"></label>
      <input value="4" name="rate" id="star4" type="radio" />
      <label title="text" htmlFor="star4"></label>
      <input value="3" name="rate" id="star3" type="radio" defaultChecked />
      <label title="text" htmlFor="star3"></label>
      <input value="2" name="rate" id="star2" type="radio" />
      <label title="text" htmlFor="star2"></label>
      <input value="1" name="rate" id="star1" type="radio" />
      <label title="text" htmlFor="star1"></label>
    </div>
  )
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage = { type: "message", content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    await dispatch(fetchSongsFromEmotions(inputValue));
    setIsFetching(true);

    setInputValue("");
  }
  function getArtistName(song) {

    const artist = artists.find(artist => artist._id === song.id_accounts);
    const artistName = artist.account_name;
    return artistName;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    if (isFetching) {
      const generatedAnswer = `I will suggest some ${getTypeName()} music for you:
       `;

      let newAnswer1 = { type: "answer", content: generatedAnswer };
      setMessages((prevMessages) => [...prevMessages, newAnswer1]);
      // songs.map((song) => {
      //   let newAnswer = { type: "answer", content: song.name_song };
      //   // console.log(song.name_song);
      //   setMessages((prevMessages) => [...prevMessages, newAnswer]);
      // })
      songs.forEach((song) => {
        const songComponent = (
          <SongContainer
            key={song._id}
            title={song.name_song}
            artist={getArtistName(song)}
            imgSrc={`./images/${song._id.toString()}.jpg`}
            onClick={() => dispatch(setCurrentSong(song))}
          />
        );
        setMessages((prevMessages) => [...prevMessages, { type: "answer", content: songComponent }]);
      });

      setMessages((prevMessages) => [...prevMessages, { type: "answer", content: ratingElement }]);


      setIsFetching(false); // Kết thúc fetch
    }
    scrollToBottom();

  }, [messages, isFetching]);
  function getTypeName() {

    const type = types.find(type => type._id === firstSong.id_type);
    const typeName = type.name_type;
    return typeName;
  }
  return (
    <div className={styles.mainContent}>
      <h3>Top Album</h3>
      {albums && albums.length > 0 ? (
        albums.map((album) => {
          return (
            <>
              <div className={styles.genres}>
                <GenreCard
                  title={album.name_album}
                  imgSrc={`./images/${album._id.toString()}.jpg`}
                  onClick={() => {
                    dispatch(setCurrentAlbum(album));
                    navigate('/album');
                  }}
                />
              </div >
            </>
          )
        })) : (
        <p>No Album available</p>
      )}
      <div className={styles.chatContent}>
        <div className={styles.chat}>
          <h1>How are you doing today,</h1>
          <h1>mate?</h1>
          <div className={styles.messageContainer}>
            {/* {messages.map((message, index) => (
              <div key={index} className={styles.message}>
                {message}
              </div>
            ))} */}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.type === "message" ? styles.message : styles.answer}
              >
                {msg.content}
              </div>
            ))}

            {/* <p className={styles.answer}>Tôi sẽ gợi ý cho bạn một vài bài nhạc {getTypeName}</p>
            {songs && songs.length > 0 ? (
              songs.map((song) => {
                return (
                  <>
                    <div key={song._id} className={styles.answer}>{song.name_song}</div>
                  </>
                )
              })) : (
              <p></p> // Thông báo nếu không có playlists
            )} */}
            {/* <div className={`${styles.rating} ${styles.answer}`}>
              <p>Are you satify?</p>
              <input value="5" name="rate" id="star5" type="radio" />
              <label title="text" htmlFor="star5"></label>
              <input value="4" name="rate" id="star4" type="radio" />
              <label title="text" htmlFor="star4"></label>
              <input value="3" name="rate" id="star3" type="radio" checked="" />
              <label title="text" htmlFor="star3"></label>
              <input value="2" name="rate" id="star2" type="radio" />
              <label title="text" htmlFor="star2"></label>
              <input value="1" name="rate" id="star1" type="radio" />
              <label title="text" htmlFor="star1"></label>
            </div> */}

            <div ref={messageEndRef}></div>
          </div>
          <input
            type="text"
            placeholder='Talk to me ...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <img className={styles.img} src="../assets/icons/cat.svg" alt="" />
      </div>
    </div>
  )
}

export default Search