
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home"
import Artist from "./pages/Artist/Artist"
import MainLayout from './layouts/MainLayout';
import Search from './pages/Search/Search.jsx';
import Playlist from './pages/Playlist/Playlist.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Account from './pages/Account/Account.jsx';
import ArtistAll from "./pages/ArtistAll/ArtistAll.jsx";
import AllAlbum from "./pages/AllAlbum/AllAlbum.jsx";
import AllSong from "./pages/AllSong/AllSong.jsx";
import Album from "./pages/Album/Album.jsx";
import Loves from "./pages/Loves/Loves.jsx";
import SearchResult from "./pages/SearchResult/SearchResult.jsx";
import AccountLayout from './layouts/AccountLayout.jsx';
import AccountArtist from './pages/Account/AccountArtist.jsx';
import NewSong from './pages/NewSong/NewSong.jsx';
import NewSongSecond from './pages/NewSong/NewSongSecond.jsx';
import Lyrics from './pages/Lyrics/Lyrics.jsx';
// import { useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout wrapper */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/artist/all" element={<ArtistAll />} />
          <Route path="song/all" element={<AllSong />} />
          <Route path="album/all" element={<AllAlbum />} />
          <Route path="/album" element={<Album />} />
          <Route path="/loves" element={<Loves />} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/lyrics" element={<Lyrics />} />
        </Route>
        <Route path="/account" element={<AccountLayout />}>
          <Route path="/account" element={<Account />} />
          <Route path="artist" element={<AccountArtist />} />
          <Route path="artist/new-song" element={<NewSong />} />
          <Route path="artist/new-song-2" element={<NewSongSecond />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;