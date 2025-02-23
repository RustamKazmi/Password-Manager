import React from "react";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
 
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [forminfoArray, setforminfoArray] = useState([]);


  const getPass=async()=>{
    let req =await fetch("http://localhost:3000/",)
     let forminfo = await req.json()
      setforminfoArray(forminfo);
      console.log(forminfo)
  }
  useEffect(() => {
    getPass()
    
  }, []);

  const copyText = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  const handleShowPass = (e) => {
    if (e.target.src.includes("/icons/show.svg")) {
      passwordRef.current.type = "password";
      e.target.src = "/icons/eyecross.png";
    } else {
      passwordRef.current.type = "text";
      e.target.src = "/icons/show.svg";
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const SavePass = async() => {
    // if(form.site.length>3 && form.username.length>3 && form.password.length>3 ){

    toast.success("Password saved Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ id: form.id})})


   await fetch("http://localhost:3000", {method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...form, id:uuidv4()})})
      setforminfoArray([...forminfoArray, { ...form, id: uuidv4() }]);
      // localStorage.setItem("forminfo", JSON.stringify([...forminfoArray, { ...form, id: uuidv4() }]));
  };
  // else{
  //   toast.error("Input fields require at least 3 words!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // }
  // };
  const handleEdit = (id) => {
    setform({...forminfoArray.filter((item) => item.id === id)[0], id:id});
    setforminfoArray(forminfoArray.filter((item) => item.id !== id));
  };

  const handleDelete =async (id) => {
    let c = confirm("are you really want to delete it?");
    if (c) {
      toast("Password Deleted Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

      setforminfoArray(forminfoArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ id})})

      // localStorage.setItem("forminfo",JSON.stringify(forminfoArray.filter((item) => item.id != id)));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-600 opacity-20 blur-[100px]"></div>
      </div>
      <div className="md:mycontainer p-4  min-h-[78.7vh] md:mx-auto bg-slate-200 max-w-4xl">
        <div className="logo font-bold text-2xl text-center">
          <span className="text-green-600"> &lt;</span>
          Pass
          <span className="text-green-600 text-2xl">OP/&gt;</span>
        </div>
        <p className="font-bold text-xl text-center my-3">
          Your own Password Manager
        </p>
        <div className="flex flex-col">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full px-2 w-full border border-green-500"
            type="text"
            name="site"
            id="1"
          />
          <div className="md:flex gap-4 w-full my-4">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="w-full px-2 md:mb-0 mb-4 rounded-full border border-green-500"
              type="text"
              name="username"
              id="2"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="w-full rounded-full px-2 border border-green-500"
                type="password"
                name="password"
                id="3"
              />
              <div className="absolute right-1 top-[2px]">
                <img
                  className="cursor-pointer"
                  onClick={handleShowPass}
                  width={20}
                  src="icons/show.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={SavePass}
              className="flex items-center mx-auto gap-1 p-1 px-3 bg-green-500 hover:bg-green-600 rounded-full"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          </div>
      
        <div className=" md:forminfo pt-2">
          <h2 className="text-2xl font-bold py-2">Your Passwords</h2>
          {forminfoArray.length === 0 && (
            <div className="p-2">No Password to Show</div>
          )}
          {forminfoArray.length > 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className=" bg-green-700">
                <tr>
                  <th className="text-white">Site</th>
                  <th className="text-white">Username</th>
                  <th className="text-white">Password</th>
                  <th className="text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {forminfoArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-40 border border-white">
                        <div className=" flex justify-center items-center gap-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div className="lordiconCopy">
                            <lord-icon
                              style={{
                                paddingTop: "4px",
                                width: "21px",
                                paddingLeft: "2px",
                                cursor: "pointer",
                              }}
                              src="https:/cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-40 border border-white py-2">
                        <div className=" flex justify-center items-center gap-2">
                          {item.username}
                          <div className="lordiconCopy">
                            <lord-icon
                              style={{
                                paddingTop: "4px",
                                width: "21px",
                                paddingLeft: "2px",
                                cursor: "pointer",
                              }}
                              src="https:/cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-40 border border-white py-2">
                        <div className=" flex justify-center items-center gap-2">
                          {item.password}
                          <div className="lordiconCopy">
                            <lord-icon
                              style={{
                                paddingTop: "4px",
                                width: "21px",
                                paddingLeft: "2px",
                                cursor: "pointer",
                              }}
                              src="https:/cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-40 border border-white py-2">
                        <div className=" flex justify-center items-center gap-2">
                          <span
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                              }}
                            ></lord-icon>
                          </span>
                          <span
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          >
                            <lord-icon 
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                              }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      </div>

    </>
  );
};

export default Manager;
