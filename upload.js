import multer from "multer";
// set file size for upload 
let file_Size=2*1024*1024
//  lets define storage for a file uplaod where file will be stored after uplaod ;

const storage=multer.diskStorage({

    // tell where file will be stored 
    destination:(req,file,cb)=>{

        cb(null,"./uploads/public")
    },


    // filename tell what will the name of a file
    filename:(req,file,cb)=>{

        const newNameform=Date.now()+"-"+Math.round(Math.random()*1E9);
       
        cb(null,newNameform+"-"+file.originalname)
    }
})



const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const isAllowed = allowedTypes.test(file.mimetype);
    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, or PDF files are allowed"), false);
    }
  };

export const upload = multer({storage:storage,
    limits:{
        fileSize:file_Size
    },
    fileFilter:fileFilter
});