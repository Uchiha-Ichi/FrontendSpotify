import PlayListContainer from "../PlaylistContainer/PlaylistContainer";
import styles from "./SideBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../../redux/playlistSlice";
import { setCurrentLovedSong, setCurrentPlaylist } from "../../redux/songSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlaylist } from "../../redux/playlistSlice";
function SideBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const account = useSelector((state) => state.auth.login.currentAccount);
    const { currentPlaylist } = useSelector((state) => state.songs);
    const playlists = useSelector((state) => state.playlists.playlists);
    // const [newPlaylists, setNewPlaylists] = useState([]);

    // Fetch playlists when account is available
    useEffect(() => {
        if (account) {
            dispatch(fetchPlaylists());
        }
    }, [account, dispatch]);
    const handleAddPlaylist = async () => {
        const newPlaylist = `New Playlist ${playlists.length + 1}`;
        // setNewPlaylists([...newPlaylists, newPlaylist]);
        await dispatch(addPlaylist(newPlaylist.toString()));
        await dispatch(fetchPlaylists());
    };
    if (!account) {
        return <div className={styles.sideBar}>
            <div className={styles.sideBarHeader}>
                <span> Log in to create your own playlist</span>
            </div>
        </div>;
    }

    return (
        <div className={styles.sideBar}>
            <div className={styles.sideBarHeader}>
                <button>
                    <img src="../assets/icons/library.svg" alt="your library" />
                </button>
                <h2>Your Library</h2>
                <button id={styles.addBtn} onClick={handleAddPlaylist}>
                    <img src="../assets/icons/add.svg" alt="add to library" />
                </button>
            </div>
            <div className={styles.sideBarMainContent}>
                <PlayListContainer
                    key={account._id} // Đảm bảo mỗi phần tử trong danh sách có key duy nhất
                    imgSrc={"../assets/img/like-song.svg"}
                    nameplay="Loves"
                    onClick={() => {
                        if (account !== setCurrentLovedSong) {
                            dispatch(setCurrentLovedSong(account));
                            navigate('/Loves')
                        }
                    }}

                />

                {/* {newPlaylists.length > 0 &&
                    newPlaylists.map((playlist) => (
                        <PlayListContainer
                            key={playlist._id}
                            nameplay={playlist.name_playlist}
                            onClick={() => {
                                if (playlist !== currentPlaylist) {
                                    dispatch(setCurrentPlaylist(playlist));
                                    navigate('/playlist')
                                }
                            }}
                        />
                    ))} */}
                {playlists && playlists.length > 0 ? (
                    playlists.slice().reverse().map((playlist) => {
                        return (
                            <PlayListContainer
                                key={playlist._id} // Đảm bảo mỗi phần tử trong danh sách có key duy nhất
                                imgSrc={"../assets/img/playlist.png"}
                                nameplay={playlist.name_playlist}
                                onClick={() => {
                                    if (playlist !== currentPlaylist) {
                                        dispatch(setCurrentPlaylist(playlist));
                                        navigate('/playlist')
                                    }
                                }}

                            />
                        )
                    })
                ) : (
                    <div className={styles.sideBarHeader}>You do not have any playlist now. Create one!
                    </div>
                )}
            </div>
        </div>
    );
}

export default SideBar;
