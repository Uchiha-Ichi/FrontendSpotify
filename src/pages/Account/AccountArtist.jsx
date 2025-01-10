import styles from "./AccountArtist.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import ThreeDotsBtn from "../../components/ThreeDotsBtn/ThreeDotsBtn";
import SongContainer from "../../components/SongContainer/SongContainer";
import { Link } from "react-router-dom";
import { fetchSongsFromArtist, setCurrentSong, addSongToAlbum, editSong, deleteSong } from "../../redux/songSlice";
import { fetchAlbumsForAccount, addAlbum } from "../../redux/albumSlice";

function AccountArtist() {

    const [isEditing, setIsEditing] = useState(false);
    const popupRef = useRef(null);
    const [newName, setNewName] = useState('');
    const [newLyrics, setNewLyrics] = useState('');
    const [newAlbum, setNewAlbum] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const dispatch = useDispatch();
    const account = useSelector((state) => state.auth.login.currentAccount);
    const albums = useSelector((state) => state.albums.albums);
    const songs = useSelector((state) => state.songs.songs);

    let [songThreeDots, setSongThreeDots] = useState(null);
    useEffect(() => {
        dispatch(fetchAlbumsForAccount());
        dispatch(fetchSongsFromArtist(account._id));
        const handleClickOutside = (e) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(e.target)
            ) {
                handleCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch, account._id]);

    const handleEdit = () => {
        setIsEditing(true);
    }
    const Options = [
        { label: 'Add to Album', onClick: () => null },
        { label: 'Edit', onClick: handleEdit },
        { label: 'Delete', onClick: () => handleDeleteSong(songThreeDots) }
    ];
    const optionsAlbum = [
        ...(Array.isArray(albums) ? albums.map((album) => ({
            label: album.name_album,
            onClick: () => handleAddSongToAlbum(album, songThreeDots)
        })) : [])
    ];
    const handleAddSongToAlbum = async (album, song) => {
        await dispatch(addSongToAlbum({ id_album: album._id, id_song: song._id }));
        await dispatch(fetchAlbumsForAccount());
        await dispatch(fetchSongsFromArtist(account._id));
    }
    const handleDeleteSong = async (song) => {
        await dispatch(deleteSong(song._id));
        await dispatch(fetchAlbumsForAccount());
        await dispatch(fetchSongsFromArtist(account._id));
    }
    function getAlbumName(song) {
        if (song.id_album) {
            const album = albums.find(ablumItem => ablumItem._id === song.id_album);
            if (album) {
                return album.name_album; // Trả về name_album nếu album tồn tại
            }
        } else {
            return undefined
        }
    }


    const handleCancel = () => {
        setIsEditing(false);
    }
    const handleSave = async () => {
        if (newName !== "") {
            await dispatch(editSong({
                id_song: songThreeDots._id,
                name_song: newName,
                description: newDescription,
            }));
            await dispatch(fetchAlbumsForAccount());
            await dispatch(fetchSongsFromArtist(account._id));
            await setIsEditing(false);
        }
    }
    const handleSaveAlbum = async () => {
        setIsEditing(false);
        await dispatch(addAlbum(newAlbum.toString()));
        await dispatch(fetchAlbumsForAccount());
    }


    function timePlay() {
        const randomMinutes = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
        const randomSeconds = Math.floor(Math.random() * (59 - 10 + 1)) + 10;
        const formattedSeconds = randomSeconds < 10 ? `0${randomSeconds}` : randomSeconds;
        return `${randomMinutes}:${formattedSeconds}`;
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }


    return (
        <>
            <h1>Honor the arts, </h1>
            <h1>Time to create and inspire</h1>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Link to=".."><img src="../assets/icons/return.svg" alt="" /></Link>
                    <Link to="../artist/new-song" className={styles.link}>New Song</Link>
                </div>
                <h2>Your Song</h2>
                {isEditing && (
                    <div ref={popupRef} className={styles.popup}>
                        <button onClick={handleCancel} className={styles.closeBtn}>
                            X
                        </button>
                        <h2>Edit Song</h2>
                        <div>
                            <label>name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Song name"
                                required
                            />
                        </div>
                        <div>
                            <label>Lyrics</label>
                            <textarea
                                name="lyrics"
                                value={newLyrics}
                                onChange={(e) => setNewLyrics(e.target.value)}
                                placeholder="Lyrics"
                                required rows={10}
                            />
                        </div>

                        <div>
                            <button onClick={handleSave()} className={styles.saveBtn}>
                                Save
                            </button>
                            <button onClick={handleCancel} className={styles.cancelBtn}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )
                }
                {isEditing && <div onClick={handleCancel} className={styles.overlay}></div>}

                <div className={styles.gridContainer}>
                    <div className={styles.gridHeader}>#</div>
                    <div className={styles.gridHeader}>Title</div>
                    <div className={styles.gridHeader}>Album</div>
                    <div className={styles.gridHeader}>Date Added</div>
                    <div className={styles.gridHeader}><img src="../assets/icons/time.svg" alt="" /></div>
                    <div className={styles.gridHeader}></div>

                    {songs && songs.length > 0 ? (
                        songs.map((song, index) => {
                            return (
                                <>
                                    <div className={styles.gridCell} >{index + 1}</div>
                                    <SongContainer className={styles.gridCell}
                                        imgSrc={`/images/${song._id.toString()}.jpg`}
                                        title={song.name_song}
                                        artist={account.account_name}
                                        onClick={() => dispatch(setCurrentSong(song))}
                                    />
                                    <div className={styles.gridCell}>{getAlbumName(song)}</div>
                                    <div className={styles.gridCell}>{formatDate(song.create_date)}</div>
                                    <div className={styles.gridCell}>{timePlay()}</div>
                                    <ThreeDotsBtn
                                        options={Options}
                                        optionsPlaylist={optionsAlbum}
                                        onOpen={() => setSongThreeDots(song)} class={styles.gridCell} />
                                </>
                            )
                        })
                    ) : (
                        <p>No songs available</p>
                    )}
                </div>
                <div className={styles.menu}>
                    <Link to=".."><img src="../assets/icons/return.svg" alt="" /></Link>
                    <button onClick={handleEdit}>New Album</button>
                    {isEditing && (
                        <div ref={popupRef} className={styles.popup}>
                            <button onClick={handleCancel} className={styles.closeBtn}>
                                X
                            </button>
                            <h2>New Album</h2>
                            <div>
                                <label>name</label>
                                <input
                                    type="text"
                                    value={newAlbum}
                                    onChange={(e) => setNewAlbum(e.target.value)}
                                    placeholder="Album name"
                                    required
                                />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder="Description"
                                    required rows={5}
                                />
                            </div>

                            <div>
                                <button onClick={handleSaveAlbum} className={styles.saveBtn}>
                                    Save
                                </button>
                                <button onClick={handleCancel} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )
                    }
                    {isEditing && <div onClick={handleCancel} className={styles.overlay}></div>}
                </div>
                <h2>Your Album</h2>
                <div className={styles.gridContainer}>
                    <div className={styles.gridHeader}>#</div>
                    <div className={styles.gridHeader}>Title</div>
                    <div className={styles.gridHeader}>Artist</div>
                    <div className={styles.gridHeader}>Date Added</div>
                    <div className={styles.gridHeader}></div>
                    <div className={styles.gridHeader}></div>

                    {albums && albums.length > 0 ? (
                        albums.map((album, index) => {
                            return (
                                <>
                                    <div className={styles.gridCell}>{index + 1}</div>
                                    <div className={styles.gridCell}>{album.name_album}</div>
                                    <div className={styles.gridCell}>{account.account_name}</div>
                                    <div className={styles.gridCell}>{formatDate(album.create_date)}</div>
                                    <div className={styles.gridCell}>Edit</div>
                                    <div className={styles.gridCell}>Delete</div>
                                </>
                            )
                        })
                    ) : (
                        <p>No albums available</p>
                    )}

                </div>
            </div>
        </>
    )
}
export default AccountArtist;