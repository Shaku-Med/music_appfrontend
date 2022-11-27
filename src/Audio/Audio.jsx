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

   

    axios
      .post("https://musicbackend.mohamedbrima.repl.co/home/data/get", {
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
            if(val.audioid === localStorage.getItem('index') || val.audioid === value){ 
              setdata(val);
              audio.src = val.audio

              if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                  title: val.audiotitle,
                  artist: 'Playing on Listen...',
                  album: 'Listen got more for you...',
                  artwork: [
                    { src: val.audioimage,   sizes: '96x96',   type: 'image/png' },
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
        //  let ml = parseInt((audio.duration / 60 - audio.currentTime / 60) % 60)
        //  var sl = parseInt(audio.duration % 60 - audio.currentTime);
        //  console.log(sl)
  
        //counting up
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt((audio.currentTime / 60) % 60);
        if(s < 10){ 
          setfulltime(m + ":0" + s)
        }
        else { 
          setfulltime(m + ":" + s)
        }
  
  
        // Max Duration done
  
  
        var dura = audio.duration
  
        var sec = new Number()
        var min = new Number()
  
        sec = Math.floor( dura );    
        min = Math.floor( sec / 60 );
        min = min >= 10 ? min : '0' + min;    
        sec = Math.floor( sec % 60 );
        sec = sec >= 10 ? sec : '0' + sec;
  
        if(!isNaN(audio.duration)){ 
          setplaylen(min + ":" + sec)
        }
        else { 
          setplaylen("0:00")
        }
  
      }

      let rangeie = document.querySelector("#rangeie")
      rangeie.value = "0"

      let position  = 0;
      setInterval(() => {
        if(!isNaN(audio.duration)){ 
          position = audio.currentTime * (100 / audio.duration)
          rangeie.value = position
        }
      }, 1000);

  }, []);



  useEffect(() => { 
    let audio = document.querySelector("audio")

    owner_p.map(val => { 
      if(val.audioid === localStorage.getItem('index') || val.audioid === value){ 
        setdata(val);
        audio.src = val.audio
        audio.play()
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: val.audiotitle,
            artist: 'Playing on Listen...',
            album: 'Listen got more for you...',
            artwork: [
              { src: val.audioimage,   sizes: '96x96',   type: 'image/png' },
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
  }, [value])





  return (
    <div className="audio_book" style={{display: localStorage.getItem("index") && localStorage.getItem('index') !== null ? "flex" : "none"}}>
      <div className="aud_conta">
        <div className="controls_one">
          <img
            src={data.audioimage}
            alt=""
          />
          <marquee behavior="" direction="">
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
              }
              else { 
                setplaying(false)
                audio.pause()
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
