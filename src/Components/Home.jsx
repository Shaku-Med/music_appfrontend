import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ContextAudio } from '../Audconnection/ContextAudio'

function Home({socket}) {
 const {value, setvalue, playing, setplaying, audid, setaudid} = useContext(ContextAudio)



 useEffect(() => { 
    let body = document.querySelector("body")
    body.style.overflow = "auto"
    body.style.overflowX = "hidden"
 })

 const [data, setdata] = useState([])
 const [notdata, notelist] = useState([])
 const [note, setnote] = useState([])

 useEffect(() => { 
    axios.post("https://musicbackend.mohamedbrima.repl.co/home/data/get", { 
       c_usr: Cookies.get("c_usr")
    }).then(res => { 
        if(res.data !== "wrong"){ 
            setdata(res.data)
            notelist(res.data)
            res.data.map(val => { 
                if(val.audioid === localStorage.getItem('index') || val.audioid === value){ 
                    setnote(val)
                }
            })
        }
        else { 
            Cookies.remove("c_usr")
        }
    })

 }, [])

 useEffect(() => { 
    notdata.map((val) => { 
        if(val.audioid === localStorage.getItem('index') || val.audioid === value){ 
            setnote(val)

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
    })
 }, [value])

 const [videoco, setvideoco] = useState(false)

 useEffect(() => { 
    window.onscroll = e => { 
        let scroll = window.scrollY
        let now_playing = document.querySelector(".now_playing")
        let sweet_blur = document.querySelector(".sweet_blur")

        now_playing.style.backgroundPositionY = .5 * scroll + 'px'
        sweet_blur.style.backgroundPositionY = .5 * scroll + 'px'
    }

    // Visualizer...


 }, [])

 const [truth, settu] = useState(true)

 setInterval(() => {
    settu(true)
 }, 10);

  return (
    <div className="tool_aud_grid">
        <Link to="../Uploads"  style={{textAlign: 'center', padding: '10px'}}>
           <button className='btn btn-dark mb-2'>
               Upload yours
           </button>
        </Link>

        <Link to={""}  style={{textAlign: 'center', padding: '10px'}}>
           <button onClick={e => { 
              if(window.confirm("Do your want to logout?") === true){ 
                Cookies.remove("c_usr")
              }
           }} className='btn btn-danger mb-2'>
               Logout
           </button>
        </Link>

       <div className='vicontai'>
          <video muted playsInline controlsList='nodownload' controls src="https://musicbackend.mohamedbrima.repl.co/Audio/trim.8eb359d8-6245-4904-96fc-32abe08ad0e5.mov"/>
       </div>

       <div className="mainpa">
         
       <div style={{backgroundImage: `linear-gradient(to top left, #00000058 0%, var(--mainbg) 60%), url(${note.audioimage})`}} className="now_playing">
            <div className="mage_cont" style={{position: 'relative'}}>
            <img
             onError={e => { 
                e.target.src = "https://st.depositphotos.com/1002049/3381/i/600/depositphotos_33813075-stock-photo-error.jpg"
            }}
             src={note.audioimage} alt="" />
            <i 
            onClick={e => { 

                if(localStorage.getItem("index") === note.audioid){ 
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
                }
                else { 
                    setvalue(note.audioid)  
                }

                if(!localStorage.getItem("index")){ 
                    localStorage.setItem("index", note.audioid)
                    window.location.reload()
                }
                else if(localStorage.getItem("index") === null){ 
                    localStorage.setItem("index", note.audioid)
                    window.location.reload()
                }
                else { 
                    localStorage.setItem("index", note.audioid)
                }
            }}
             className={value === note.audioid ? playing === false ? "fa fa-play" : "fa fa-pause" : "fa fa-play"} style={{color: 'white'}}></i>
            </div>
            <div className="song_pn">
                <div title={note.audiotitle} className="h2">{note.audiotitle}</div>
                <div className="p">{localStorage.getItem("index") && localStorage.getItem("index") !== null ? "Now playing...": "Nothing's playing."}</div>
            </div>
        </div>
       </div>

        <div className="sweet_blur" style={{backgroundImage: `url(${note.audioimage})`}} >
        <div  className="home_tools">
            { 
               data.map((val, key) => { 
                 return ( 
                    <div  
                    onClick={e => { 

                        if(localStorage.getItem("index") === val.audioid){ 

                          
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
                        }
                        else { 
                            setvalue(val.audioid)  
                        }

                        if(!localStorage.getItem("index")){ 
                            localStorage.setItem("index", val.audioid)
                            window.location.reload()
                        }
                        else if(localStorage.getItem("index") === null){ 
                            localStorage.setItem("index", val.audioid)
                            window.location.reload()
                        }
                        else { 
                            localStorage.setItem("index", val.audioid)
                        }
                    }}
                     key={key} className="im_tool1">
                        <div className="co_mi">
                        <img onError={e => { 
                            e.target.src = "https://st.depositphotos.com/1002049/3381/i/600/depositphotos_33813075-stock-photo-error.jpg"
                        }} src={val.audioimage} alt="" />
                        <i  className={value === val.audioid ? playing === false ? "fa fa-play" : "fa fa-pause" : "fa fa-play"} style={{color: 'white'}}></i>
                        </div>
                        <div title={val.audiotitle} className="h3" style={{color:localStorage.getItem("index") === val.audioid ? "palegreen" : "val(--maincl)" ? value === val.audioid ? playing === false : "var(--maincl)" : "palegreen"}}>{val.audiotitle}</div>
                    </div>
                 )
               })
            }
        <h1 style={{height: '30vh'}}></h1>
        </div>
        </div>

       
    </div>
  )
}

export default Home
