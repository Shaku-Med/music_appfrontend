import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Upload() {

    const [title, settitle] = useState('')
    const [audio, setaudio] = useState('')
    const [image, setimage] = useState('')

    const navigate = useNavigate()

    const handle_send = async e => {
        try {
            e.preventDefault()

            if (title === "") {
                alert("Enter your title")
            }
            else if (audio === "") {
                alert("Choose your Audio file")
            }
            else if (image === "") {
                alert("Choose your Image file")
            }
            else {

                let moveme = document.getElementById("moveme")
                moveme.disabled = true
                let arr = {
                    image: image
                }
                await axios.post("https://crppdn-3000.csb.app/uploads/image", arr, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })


                let ars = {
                    uid: Cookies.get("c_usr"),
                    audio: audio,
                    title: title
                }
                await axios.post("https://crppdn-3000.csb.app/uploads/audio", ars, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(res => {
                    if (res.data === 'success') {
                        navigate({
                            pathname: "../",
                            state: "fetch"
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);
                    }
                })
            }
        }
        catch {
            alert('upload failed.')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    };

  return (
    <div className=" uploadspart">
        <div className="h3 text-center">Wanna Upload?</div>
        <div className="up_nxt">
          <form onSubmit={handle_send} action="">
          <div className="cols">
                <label htmlFor="title">Enter your Song Title</label>
                <input onChange={e => settitle(e.target.value)} placeholder='Enter your title' type="text" name="" id="title" />
            </div>
            <div className="cols">
                <label htmlFor="audios">Choose Your Audio</label>
                <input onChange={e => { 
                    setaudio(e.target.files[0])
                }} accept='audio/mpeg, video/mp4, audio/wav, audio/mp3' type="file" name="" id="audios" />
            </div>
            <div className="cols">
                <label htmlFor="image">Choose Your Image</label>
                <input  onChange={e => setimage(e.target.files[0])}  accept='image/*' type="file" name="" id="image" />
            </div>
             <div style={{width: "100%"}} onPointerOver={e => { 
                let moveme = document.getElementById("moveme")
                if(title === ""){ 
                    if(e.clientX > 200.3999938964844){ 
                        moveme.style.marginLeft = "0%"
                    }
                    else { 
                        moveme.style.marginLeft = "80%"
                    }
                }
                else if(audio === ""){ 
                    if(e.clientX > 200.3999938964844){ 
                        moveme.style.marginLeft = "0%"
                    }
                    else { 
                        moveme.style.marginLeft = "80%"
                    }
                }
                else if(image === ""){ 
                    if(e.clientX > 200.3999938964844){ 
                        moveme.style.marginLeft = "0%"
                    }
                    else { 
                        moveme.style.marginLeft = "80%"
                    }
                }
                else { 
                }
            }} className="button_part">
             <button style={{marginLeft: '80%'}} id='moveme' className="btn btn-primary mt-2">Upload</button>
             </div>
          </form>
        </div>
    </div>
  )
}

export default Upload