import { useState } from "react";
import "./App.css";
import axios from 'axios'

function App() {
  // state for handling file upload
  const [file, setfile] = useState("");
  const [mutiplefile,setMutiplefile]=useState("");
  console.log(mutiplefile)


  // handle to upload file

  const HanldeUpload = async(e) => {
    e.preventDefault();
    console.log(file);

    if (file?.name) {
      const formdata=new FormData();
      formdata.append("file",file)
      const res=await axios.post("http://localhost:5000/upload/file",formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      console.log(res.data)

    } else {
      alert("please select a file you uplaod");
    }
  };


  // handle multiple upload here 
  const HanldeMutipleUpload=async(e)=>{
    e.preventDefault();
    console.log(mutiplefile);

    if (mutiplefile?.length>0) {
      const formdata=new FormData();
      for(let i=0;i<mutiplefile?.length;i++){
        formdata.append("files",mutiplefile[i])
      }
      
    
    
      const res=await axios.post("http://localhost:5000/upload/mutiplefiles",formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      console.log(res.data)

    } else {
      alert("please select a file you uplaod");
    }
  }

  return (
    <>
      <h1>How to use Multer</h1>

      <form onSubmit={HanldeUpload} action="">
        <h1>Upload single file data </h1>
        <input type="file" name="file" onChange={(e) => setfile(e.target.files[0])}  />
        <button>Uplaod</button>
      </form>

      <form onSubmit={HanldeMutipleUpload} action="">
        <h1>Upload multiple  file data </h1>
        <input type="file" name="files" onChange={(e) => setMutiplefile(e.target.files)} accept="image/*" multiple />
        <button>Uplaod</button>
      </form>
    </>
  );
}

export default App;
