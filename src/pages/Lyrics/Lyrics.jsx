import styles from './Lyrics.module.scss'
import { useSelector } from "react-redux";

function Lyrics() {
    const { currentSong } = useSelector((state) => state.songs);

    return (
        <div className={styles.lyrics}>
            <pre>
                {
                    currentSong.lyrics
                /* {`
I thought that you remember, but it seems that you forgot
It's hard for me to blame you when you were already lost
Oh, yeah, I'm tired of always waiting, oh, yeah, yeah
I see you changed your number, that's why you don't get my calls
I gave you all of me, now you don't wanna be involved
Oh, yeah, yeah, I really gotta face it, oh, yeah, yeah
I just wanna be the one
But to you, we're already done
Tell me, why'd you have to hit-and-run me?
Now I'm all alone cryin' ugly
You broke my heart just for fun
Took my love and just left me numb
Now it's eight in the morning
Hate in the morning all because of you
Another story that's sad and true
I can feel the pain, can you?
You had to be the one to let me down
To color me blue
Hate to see you with someone new
I'll put a curse on her and you
Ain't no looking back, now you're dead and gone
My love is gone too
All my love is gone
All my love is gone
All my love is gone
All my love is gone
Now you're dead and gone
All my love is gone and the hate has grown
Standing all alone and I'm searching for somethin'
But I can't feel nothin'
I pack my bags and go, this don't feel like home
Too much darkness for a rainbow, I feel so used
How am I supposed to live without you? I refuse, yeah
I just wanna be the one
But to you, we're already done
Tell me, why'd you have to hit-and-run me?
Now I'm all alone cryin' ugly
You broke my heart just for fun
Took my love and just left me numb
Now it's eight in the morning
Hate in the morning all because of you
Another story that's sad and true
I can feel the pain, can you?
You had to be the one to let me down
To color me blue
Hate to see you with someone new
I'll put a curse on her and you
Ain't no looking back, now you're dead and gone
My love is gone too
All my love is gone
All my love is gone
All my love is gone
All my love is gone
Now you're dead and gone
    `} */}
            </pre>
        </div>
    )
}
export default Lyrics;