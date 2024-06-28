import logo from './logo.svg';
import './App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Auth from './Auth/Auth';
import Audio from './Audio/Audio';
import { ContextAudio } from './Audconnection/ContextAudio';
import { HashRouter } from 'react-router-dom';
import Routing from './Routing';

let App = () => {

  const [auth, setauth] = useState(true)
  const [usr, setusr] = useState(null)

  // Change max routing...
  const [value, setvalue] =  useState(localStorage.getItem("index"))
  const [playing, setplaying] =  useState(false)
  const [similar, setplaysimilar] =  useState(false)
  const [audid, setaudid] =  useState(false)

  useLayoutEffect(() => { 
    setusr(true)
    setInterval(() => {
      if(Cookies.get("c_usr")){ 
        if(Cookies.get("c_usr") !== null){ 
          setauth(true)
        }
        else { 
          setauth(false)
        }
      }
      else { 
        setauth(false)
      }
    }, 10);

    var a;


    window.onkeydown = e => { 
      let body = document.querySelector("body")
      if(e.ctrlKey && e.key === "/"){ 
        if(body.requestFullscreen()){ 
          body.requestFullscreen()
        }
        else if(body.webkitRequestFullscreen()){ 
          body.webkitRequestFullscreen()
        }
        else if(body.msRequestFullscreen()){ 
          body.msRequestFullscreen()
        }
        else if(body.requestPointerLock()){ 
          body.requestPointerLock()
        }
      }
    }

    window.ondblclick = e => { 
      let body = document.querySelector("body")
      if(e.ctrlKey && e.key === "/"){ 
        if(body.requestFullscreen()){ 
          body.requestFullscreen()
        }
        else if(body.webkitRequestFullscreen()){ 
          body.webkitRequestFullscreen()
        }
        else if(body.msRequestFullscreen()){ 
          body.msRequestFullscreen()
        }
        else if(body.requestPointerLock()){ 
          body.requestPointerLock()
        }
      }
    }
  }, [])

  return (
    <>
      {
        usr && (
          <>
            {
              [usr].map((v, k) => {
                if (v === true) {
                  return (
                    <div key={k}>
                      {
                        [auth].map((val, key) => {
                          if (val !== true) {
                            return (
                              <Auth key={key} />
                            )
                          }
                          else {
                            return (
                              <HashRouter key={key}>
                                <ContextAudio.Provider value={{ value, setvalue, playing, setplaying, similar, setplaysimilar, audid, setaudid }}>
                                  <Audio />
                                  <Routing />
                                </ContextAudio.Provider>
                              </HashRouter>
                            )
                          }
                        })
                      }
                    </div>
                  )
                }
                else {
                  console.clear()
                  return (
                    <div key={k}>
                      <div className="d-flex justify-content-center align-items-center " style={{ flexDirection: 'column', height: '100vh' }} >
                        <img src="https://i.pinimg.com/originals/46/10/95/46109566f97a41cb76393d9d668e6ff3.gif" style={{ height: "10rem" }} alt="" className="text-center" />
                        <div className="h1 font-bold d-flex justify-content-center align-items-center p-4 font-weight-bold">UnAuthorize Route.</div>
                      </div>
                    </div>
                  )
                }
              })
            }
          </>
        )
      }
    </>
  );
}

export default App;
