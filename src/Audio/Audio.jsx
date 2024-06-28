import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ContextAudio } from "../Audconnection/ContextAudio";

function Audio() {
  const [fullltime, setfulltime] = useState("");

  const { value, setvalue, playing, setplaying, similar, setplaysimilar } = useContext(ContextAudio);

  const [data, setdata] = useState([]);
  const [owner_p, setownerp] = useState([]);
  const [set_next_data, next_data] = useState([]);


  const [play_len, setplaylen] = useState('')
 
 

  useEffect(() => {

    let audio = document.querySelector("audio")

    let video = document.querySelector("video")
   

    let fnc = () => {
      try {
        if (audio && video) {
          axios
            .post("https://crppdn-3000.csb.app/home/data/get", {
              c_usr: Cookies.get("c_usr"),
            })
            .then((res) => {
              if (res.data !== "wrong") {
                setownerp(res.data)
                next_data(res.data)
                audio.onended = e => {
                  let rand = Math.floor(Math.random() * res.data.length)
                  localStorage.setItem("index", res.data[rand].audioid)
                  setvalue(res.data[rand].audioid)
                  setplaying(true)

                  localStorage.setItem("next", res.data[rand].audioid)
                }

                res.data.map(val => {
                  if (val.audioid === localStorage.getItem('index') || val.audioid === value) {
                    setdata(val);
                    audio.src = val.audio

                    if ('mediaSession' in navigator) {
                      navigator.mediaSession.metadata = new MediaMetadata({
                        title: val.audiotitle,
                        artist: 'Playing on Listen...',
                        album: 'Listen got more for you...',
                        artwork: [
                          { src: val.audioimage, sizes: '96x96', type: 'image/png' },
                          { src: val.audioimage, sizes: '128x128', type: 'image/png' },
                          { src: val.audioimage, sizes: '192x192', type: 'image/png' },
                          { src: val.audioimage, sizes: '256x256', type: 'image/png' },
                          { src: val.audioimage, sizes: '384x384', type: 'image/png' },
                          { src: val.audioimage, sizes: '512x512', type: 'image/png' },
                        ]
                      });
                    }

                    navigator.mediaSession.setActionHandler('pause', () => {
                      setplaying(false)
                      audio.pause()
                    });

                    navigator.mediaSession.setActionHandler('play', () => {
                      setplaying(true)
                      audio.play()
                    });

                    navigator.mediaSession.setActionHandler('nexttrack', () => {
                      let rand = Math.floor(Math.random() * set_next_data.length)
                      localStorage.setItem("next", localStorage.getItem("index"))
                      localStorage.setItem("index", set_next_data[rand].audioid)
                      setvalue(set_next_data[rand].audioid)
                      setplaying(true)
        
                    });
      
      
                    navigator.mediaSession.setActionHandler('previoustrack', () => {
                      localStorage.setItem("index", localStorage.getItem("next"))
                      setvalue(localStorage.getItem("next"))
                      setplaying(true)
        
                    });

                  }
                })
        
              } else {
                Cookies.remove("c_usr");
              }
            });


          audio.ontimeupdate = e => {
            let ml = parseInt((audio.duration / 60 - audio.currentTime / 60) % 60)
            var sl = parseInt(audio.duration % 60 - audio.currentTime);

          
            if (value === "15c9856b-8a52-411f-8cf3-52a3f078d29b") {
              video.currentTime = audio.currentTime
            }
            else {
            }

            if (!isNaN(audio.duration)) {
              if (sl < 10) {
                if (sl < -9) {
                  setplaylen("-" + ml + ":" + Math.abs(sl))
                }
                else {
                  setplaylen("-" + ml + ":0" + Math.abs(sl))
                }
              }
              else {
                setplaylen("-" + ml + ":" + Math.abs(sl))
              }

            }
            else {
              setplaylen("-0:00")
            }
  
            //counting up
            var s = parseInt(audio.currentTime % 60);
            var m = parseInt((audio.currentTime / 60) % 60);
            if (s < 10) {
              setfulltime(m + ":0" + s)
            }
            else {
              setfulltime(m + ":" + s)
            }
  
  
            // Max Duration done
  
  
            // var dura = audio.duration
  
            // var sec = new Number()
            // var min = new Number()
  
            // sec = Math.floor( dura );    
            // min = Math.floor( sec / 60 );
            // min = min >= 10 ? min : '0' + min;    
            // sec = Math.floor( sec % 60 );
            // sec = sec >= 10 ? sec : '0' + sec;
  
            // if(!isNaN(audio.duration)){ 
            //   setplaylen(min + ":" + sec)
            // }
            // else { 
            //   setplaylen("0:00")
            // }
  
          }

          let rangeie = document.querySelector("#rangeie")
          rangeie.value = "0"

          let position = 0;
          setInterval(() => {
            if (!isNaN(audio.duration)) {
              position = audio.currentTime * (100 / audio.duration)
              rangeie.value = position
            }
          }, 1000);



          // 

          video.style.display = "none"


        }
      }
      catch { }
    }

    fnc()
    
  }, []);



  useEffect(() => {
    let audio = document.querySelector("audio")

    let fnc = () => {
      try {
        owner_p.map(val => {
          if (val.audioid === localStorage.getItem('index') || val.audioid === value) {
            setdata(val);
            audio.src = val.audio
            audio.play()
            if ('mediaSession' in navigator) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: val.audiotitle,
                artist: 'Playing on Listen...',
                album: 'Listen got more for you...',
                artwork: [
                  { src: val.audioimage, sizes: '96x96', type: 'image/png' },
                  { src: val.audioimage, sizes: '128x128', type: 'image/png' },
                  { src: val.audioimage, sizes: '192x192', type: 'image/png' },
                  { src: val.audioimage, sizes: '256x256', type: 'image/png' },
                  { src: val.audioimage, sizes: '384x384', type: 'image/png' },
                  { src: val.audioimage, sizes: '512x512', type: 'image/png' },
                ]
              });
            }

            navigator.mediaSession.setActionHandler('pause', () => {
              setplaying(false)
              audio.pause()
            });

            navigator.mediaSession.setActionHandler('play', () => {
              setplaying(true)
              audio.play()
            });

            navigator.mediaSession.setActionHandler('nexttrack', () => {
              let rand = Math.floor(Math.random() * set_next_data.length)
              localStorage.setItem("next", localStorage.getItem("index"))
              localStorage.setItem("index", set_next_data[rand].audioid)
              setvalue(set_next_data[rand].audioid)
              setplaying(true)
  
            });


            navigator.mediaSession.setActionHandler('previoustrack', () => {
              localStorage.setItem("index", localStorage.getItem("next"))
              setvalue(localStorage.getItem("next"))
              setplaying(true)
  
            });

          }
        })

 
      }
      catch { }
    }

    if (audio) {
      fnc()
    }

  }, [value]);




  return (
    <div className="audio_book" style={{display: localStorage.getItem("index") && localStorage.getItem('index') !== null ? "flex" : "none"}}>
      <div className="aud_conta">
        <div className="controls_one">
          <i 
            onClick={e => { 
              let audio_book = document.querySelector(".audio_book")
              let aud_conta = document.querySelector(".aud_conta")
              let audco_img = document.querySelector(".aud_conta img")
              let controls_one = document.querySelector(".controls_one")
              let controli = document.querySelector(".controls_one i")
              let seekers_main = document.querySelector(".seekers_main")
              let controls = document.querySelector(".controls")
              let body = document.querySelector("body")

              audio_book.classList.remove("audbook")
              aud_conta.classList.remove("aucota")
              audco_img.classList.remove("acota_img")
              controls_one.classList.remove("onecot")
              controls.classList.remove("ct_me")
              controli.classList.remove("hmi")
              seekers_main.classList.remove("sek_me")
              body.classList.remove("mainboxy")
              body.setAttribute("style", "overflow: hidden auto")
            }}
          className="fa fa-caret-down"></i>
          <img
            onClick={e => { 
              let audio_book = document.querySelector(".audio_book")
              let aud_conta = document.querySelector(".aud_conta")
              let audco_img = document.querySelector(".aud_conta img")
              let controls_one = document.querySelector(".controls_one")
              let controli = document.querySelector(".controls_one i")
              let seekers_main = document.querySelector(".seekers_main")
              let controls = document.querySelector(".controls")
              let body = document.querySelector("body")


              audio_book.classList.add("audbook")
              aud_conta.classList.add("aucota")
              audco_img.classList.add("acota_img")
              controls_one.classList.add("onecot")
              controls.classList.add("ct_me")
              controli.classList.add("hmi")
              seekers_main.classList.add("sek_me")
              body.classList.add("mainboxy")
              body.removeAttribute("style")
            }}
            src={data.audioimage}
            alt=""
          />
          <marquee behavior="" direction="" style={{maxWidth: "150px"}}>
            <h1>{data.audiotitle}</h1>
          </marquee>
        </div>
        <div className="controls">
          <i
           onClick={e => { 
            localStorage.setItem("index", localStorage.getItem("next"))
            setvalue(localStorage.getItem("next"))
            setplaying(true)
           }}
           className="fa fa-backward"></i>
          <i
            onClick={e => { 
              let audio = document.querySelector("audio")
              if(playing === false){ 
                setplaying(true)
                audio.play()

                let video = document.querySelector("video")
                video.style.display = "none"
                if(value === "15c9856b-8a52-411f-8cf3-52a3f078d29b"){
                    video.play()
                    video.style.display = "block"
                }
                else { 
                    video.pause()
                }
              }
              else { 
                setplaying(false)
                audio.pause()

                let video = document.querySelector("video")
                video.style.display = "none"
                if(value === "15c9856b-8a52-411f-8cf3-52a3f078d29b"){
                    video.pause()
                    video.style.display = "block"
                }
                else { 
                    video.pause()
                }
              }
            }}
            className={value === data.audioid ? playing === false ? "fa fa-play" : "fa fa-pause" : "fa fa-play"}
          ></i>
          <i 
          onClick={e => { 
            let rand = Math.floor(Math.random() * set_next_data.length)
            localStorage.setItem("next", localStorage.getItem("index"))
            localStorage.setItem("index", set_next_data[rand].audioid)
            setvalue(set_next_data[rand].audioid)
            setplaying(true)
  
          }}
          className="fa fa-forward"></i>
        </div>
        <div className="seekers_main">
          <div className="pll_1">{fullltime}</div>
          <div className="ranges">
            <input
              onChange={(e) => {
                let audio = document.querySelector("audio");
                let sliderpo = audio.duration * (e.target.value / 100);
                audio.currentTime = sliderpo;
                
                let video = document.querySelector("video")
                if(value === "15c9856b-8a52-411f-8cf3-52a3f078d29b"){
                    video.currentTime = sliderpo
                }
                else { 
                    video.pause()
                }


                let output = document.querySelector("output");

                output.style.left = e.target.value + "%"
                output.innerHTML = e.target.value
              }}
              type="range"
              name=""
              id="rangeie"
            />
            <output>10</output>
          </div>
          <div className="play_len">
           {
            play_len === null ? isNaN(play_len) ? "0:00" : "0:00" : play_len
           }
          </div>
          <audio src="" className="hidden"></audio>
        </div>
      </div>
    </div>
  );
}

export default Audio;
