import React, {useState} from "react";
import "./css/home.css";
import {collection, query, where, getFirestore, onSnapshot, increment, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function Home() {
  //const {currentUser} = useContext(UserContext)
  
  const db = getFirestore();
  const userRef = collection(db, "users");
  const q = query(userRef, where("isStreaming", "==", true));
  const [streamers] = useCollectionData(q, {idField : "id"});
  var streaming = true;
  
  if (streamers >= 0) {
      streaming = false;
  }

  console.log(streamers);

  return (
    <div className="home">
    <div className="main-header">
      <div className="overlay"></div>
      <div className="container">
        <div
          className="header-content d-flex flex-column justify-content-center animate__animated animate__fadeInRight animate__delay-2s"
        >
          <h1 id="title">The Best <span id="title">Streams</span> Out There</h1>
          <p>
            Welcome to OAPlay Gaming, the home of every gamer. You can find any game you want here.
          </p>
          <button id="pay">Browse</button>
        </div>
      </div>
    </div>
    <section className="news d-flex align-items-center">
      
      <div className="news-title d-none d-sm-block">
        <h4>Latest News</h4>
      </div>
      
      <div className="news-wrap flex-grow-1">
        <div className="news-container d-flex align-items-center">
          
          <div className="item d-flex align-items-center">
            <span>NEW</span>
            <p>Feel the polygonal burn as super-speed graphics games.</p>
          </div>
          
          <div className="item d-flex align-items-center">
            <span>STRATEGY</span>
            <p>Based on anything from real-world racing leagues.</p>
          </div>
          
          <div className="item d-flex align-items-center">
            <span>RACING</span>
            <p>Collection of awesome sports cars are 3D racing games.</p>
          </div>
          
          <div className="item d-flex align-items-center">
            <span>ACTION</span>
            <p>It’s time to jump behind the wheel in our pulse-pounding Racing games!</p>
          </div>
          
          <div className="item d-flex align-items-center">
            <span>ADVENTURE</span>
            <p>Have you got the skills to beat these tough driving challenges?</p>
          </div>
        </div>
      </div>
    </section>
    {streaming ? (
      <section className="moviesection">
      <h2 className="category-title">Live</h2>
      <hr width="200%" className="rounded" />
      <div className="moviecontainer1 streamers">
      {streamers && streamers.map(stream => <Streaming stream={stream} key={stream.id}  />)}
      </div>
      </section>
    ) : (
      <div></div>
    )}
    
    <section className="moviesection">
      </section>
        <section className="moviesection">
          <h2 className="category-title">GUERRE</h2>
          <hr width="200%" className=" rounded" />
          <div className="moviecontainer" id="movies">
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=uZmUT40Q0OY">
                  <img
                    src="https://cdna.artstation.com/p/assets/images/images/018/649/488/large/jay-league-of-legends-poster.jpg?1560191675"
                    alt="LEAGUE OF LEGENDS"
                  />
                </a>
              </div>
              <h2>LEAGUE OF LEGENDS</h2>
              <span>GUERRE</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=z2HE_the-A0">
                  <img
                    src="https://cdn.gamer-network.net/2018/usgamer/pubg_mobile_header.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/pubg-mobile-is-the-worlds-most-downloaded-mobile-game-but-its-not-making-money.jpg"
                    alt="PUBG MOBILE"
                  />
                </a>
              </div>
              <h2>PUBG MOBILE</h2>
              <span>GUERRE</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=Yn3BI1N_37g">
                  <img
                    src="https://d.newsweek.com/en/full/889024/fortnite-lmg-thumbs.jpg"
                    alt="FORTNITE"
                  />
                </a>
              </div>
              <h2>FORTNITE</h2>
              <span>GUERRE</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=r72GP1PIZa0">
                  <img
                    src="https://www.mobygames.com/images/covers/l/517702-call-of-duty-black-ops-iiii-playstation-4-front-cover.png"
                    alt="CALL OF DUTY"
                  />
                </a>
              </div>
              <h2>CALL OF DUTY</h2>
              <span>GUERRE</span>
            </div>
          </div>
        </section>
        <section className="moviesection">
          <h2 className="category-title">SPORT</h2>
          <hr width="200%" className="rounded" />
          <div className="moviecontainer" id="movies">
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=vLj-27T-SEQ">
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/BohamgLoBVQezrT4eCodcg.jpg"
                    alt="FIFA 22"
                  />
                </a>
              </div>
              <h2>FIFA</h2>
              <span>FIFA 22</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=fTbf5al2Tm0">
                  <img
                    src="https://idealgamekeys.com/wp-content/uploads/2021/08/NBA-2K22-PC-Standard-Edition.jpg"
                    alt="NBA"
                  />
                </a>
              </div>
              <h2>NBA</h2>
              <span>NBA2k22</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=LMysnRt4ATY">
                  <img
                    src="https://cdn3.xsolla.com/files/uploaded/68486/b908b7c946c2421820d31a9125f17498.jpeg"
                    alt="HANDBALL"
                  />
                </a>
              </div>
              <h2>HANDBALL GAME</h2>
              <span>HANDBALL</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=FwVgsn7nCbI">
                  <img
                    src="https://cdn.geekay.com/media/catalog/product/cache/f16f349b720da0a7b8b90d96299b4477/p/i/picture8.jpg"
                    alt="TENNIS GAME"
                  />
                </a>
              </div>
              <h2>TENNIS GAME</h2>
              <span>TENNIS </span>
            </div>
          </div>
        </section>
        <section className="moviesection">
          <h2 className="category-title">ADVENTURE</h2>
          <hr width="200%" className="rounded" />
          <div className="moviecontainer" id="movies">
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=ZCZcqzXj-Ts">
                  <img
                    src="https://www.oceansofgames.co.uk/wp-content/uploads/2018/10/GTA-5-1024x576.jpeg"
                    alt="GTA 5"
                  />
                </a>
              </div>
              <h2>GTA 5</h2>
              <span>GTA 5</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=KBCkj6fCsts">
                  <img
                    src="https://www.videogamer.com/wp-content/uploads/gix30ttllzv41.jpeg   "
                    alt="ASSASSINS CREED"
                  />
                </a>
              </div>
              <h2>ASSASSINS CREED</h2>
              <span>ASSASSINS CREED VALHALLA</span>
            </div>
            <div className="movieimg">
              <div className="myimages">
                <a href="https://www.youtube.com/watch?v=hliXO-ZNhIY">
                  <img
                    src="https://www.thunderlan.org/wp-content/uploads/2017/08/Far-Cry-1-Cover.jpg"
                    alt="FAR CRY"
                  />
                </a>
              </div>
              <h2>FARCRY</h2>
              <span>FARCRY 2K20</span>
            </div>
            <div className="movieimg">
                        <div className ="myimages">
                            <a href="https://www.youtube.com/watch?v=GXglEB8gHVQ"><img src="https://i.pinimg.com/originals/dd/cb/0b/ddcb0baef816057f07d262d61a4ea1ad.jpg" alt="GOD OF WAR" /></a>
                        </div>
                        <h2>GOD OF WAR</h2>
                        <span>GOD OF WAR</span>
            </div>
           </div>
        </section>
      </div>
  );
}
function Streaming(props) {

  const { displayName, photoURL } = props.stream;
  return (<>
    <div className="moviecontainer" id="movies">
    <div className="movieimg">
    <div className="myimages">
    <a href={`/profile/${displayName}`}> 
      <img alt="profile_picture" src={photoURL} />
    </a>
    </div>
      <h2>{displayName}</h2>
    </div>
    </div>
  </>)
}