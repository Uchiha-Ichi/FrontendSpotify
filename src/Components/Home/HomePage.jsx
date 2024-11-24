import { Link } from "react-router-dom";



const Home = () => {
    // const [audioLink] = useState(
    //     "https://drive.google.com/uc?export=view&id=1gCvNcg7uCk44p1MKnqEZGHmK0maJtpLX")
    const downloadUrl = `http://localhost:8000/download?id=1gCvNcg7uCk44p1MKnqEZGHmK0maJtpLX`;
    return (
        <div className="home">
            <h1>Chào mừng đến với ứng dụng phát nhạc</h1>
            <Link to="/songlist">
                <button>Xem danh sách bài hát</button>
            </Link>
            <h2>Phát nhạc từ Google Drive</h2>
            <audio controls>
                <source src={downloadUrl} type="audio/mp3" />
            </audio>
        </div>
    );
};

export default Home;
