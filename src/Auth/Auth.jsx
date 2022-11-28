import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {v4 as uuid} from 'uuid'
function Auth() {
  const [ourfocus, setfocus] = useState("5%");
  const [code, setcode] = useState('')
  useEffect(() => {
    setInterval(() => {
      let first = document.querySelector("#first");
      first.setAttribute("maxlength", "4");
      first.setAttribute("placeholder", "Enter code (4)");
    }, 10);
  }, []);

  const handle_code = e => { 
    e.preventDefault()
     var reg = /^-?\d*\.?\d*$/
    let error_modal = document.querySelector(".error_modal")
    let ourht = document.querySelector(".ourht")
    if(code === ""){ 
        error_modal.classList.add("er")
        ourht.innerHTML = "Enter your code"
    }
    else if(code.length < 4){ 
        error_modal.classList.add("er")
        ourht.innerHTML = "Your code must be 4 numbers"
    }
    else if(code !== code.split(" ")[0]){ 
        error_modal.classList.add("er")
        ourht.innerHTML = "Your code have spaces"
    }
    else if(!code.match(reg)){ 
        error_modal.classList.add("er")
        ourht.innerHTML = "Code's invalid! This code must have contain symbols or alphas' "
    }
    else { 
        let arr = { 
            code: code,
            c_usr: uuid()
        }
        axios.post("https://musicbackend.mohamedbrima.repl.co/user/auth", arr).then(res => { 
            if(res.data.success === "success"){ 
                Cookies.set("c_usr", res.data.c_usr, {expires: 365})
                window.location.reload()
            }
            else { 
                error_modal.classList.add("er")
                ourht.innerHTML = res.data.success
            }
        })
    }
  }

  return (
    <div className="auths">
      <div className="error_modal">
        <div className="erro_cont">
          <div
            className=" ourht h2 text-center text-red-700 mb-2 mt-2 p-2"
            style={{ color: "red" }}
          >
            Error Verifying
          </div>
          <hr />
          <div className="card-text text-center mt-3">
            Please Enter your correct value to continue
          </div>
          <div
            className="buttons mt-3 p-3"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={e => { 
                let error_modal = document.querySelector(".error_modal")
                let first = document.querySelector("#first")
                error_modal.classList.remove("er")
                first.focus()
              }}
              className="btn btn-danger w-100 "
              style={{ maxWidth: "400px" }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div
        className="h-screen  py-20 px-3 relative"
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="" style={{ maxWidth: "500px", width: "100%" }}>
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className=" h-64 py-3 rounded text-center">
                <h1
                  className="h1 font-bold"
                  style={{
                    position: "absolute",
                    top: ourfocus,
                    left: "50%",
                    transition: ".3s ease-in-out",
                    transform: "translateX(-50%)",
                  }}
                >
                  Listen
                </h1>
                <div className="flex flex-col mt-4">
                  <span className="h3">Join / Login</span>
                </div>
                <hr className="mt-2" />
                <div id="otp" className="w-[100%]">
                  <form onSubmit={handle_code} action="" className="flex w-[100%] text-center">
                    <input
                      onFocus={(e) => {
                        setfocus("30%");
                      }}
                      onBlur={(e) => {
                        setfocus("5%");
                      }}
                      onChange={e => setcode(e.target.value)}
                      className="w-[100%] p-2 rounded-sm mb-3 mt-3 outline-none"
                      style={{
                        width: "100%",
                        borderRadius: 5,
                        border: "1px solid var(--maincl)",
                      }}
                      type="tel"
                      id="first"
                    />
                    <button className="w-100 btn btn-danger">
                      Login / Join
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
