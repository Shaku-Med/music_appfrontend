import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ContextAudio } from '../Audconnection/ContextAudio'

function Home(props) {
 const {value, setvalue, playing, setplaying, audid, setaudid} = useContext(ContextAudio)



 useEffect(() => { 
    let body = document.querySelector("body")
    body.style.overflow = "auto"
    body.style.overflowX = "hidden"
 })

 const [data, setdata] = useState([])

 useEffect(() => { 
    axios.post("http://localhost:3005/home/data/get", { 
       c_usr: Cookies.get("c_usr")
    }).then(res => { 
        if(res.data !== "wrong"){ 
            setdata(res.data)
        }
        else { 
            Cookies.remove("c_usr")
        }
    })

 }, [])

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
        <div className="home_tools">
            { 
               data.map((val, key) => { 
                 return ( 
                    <div key={key} className="im_tool1">
                        <img onError={e => { 
                            e.target.src = "https://st.depositphotos.com/1002049/3381/i/600/depositphotos_33813075-stock-photo-error.jpg"
                        }} src={val.audioimage} alt="" />
                        <hr />
                        <div className="h3">{val.audiotitle}</div>
                        <i onClick={e => { 

                            if(localStorage.getItem("index") === val.audioid){ 
                                let audio = document.querySelector("audio")
                                    if(playing === false){ 
                                        setplaying(true)
                                        audio.play()
                                    }
                                    else { 
                                        setplaying(false)
                                        audio.pause()
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
                        }} className={value === val.audioid ? playing === false ? "fa fa-play" : "fa fa-pause" : "fa fa-play"}></i>
                    </div>
                 )
               })
            }
        </div>
    </div>
  )
}

export default Home