import app from "./main";
import { connectDB } from "./Config/db.config";

function ServerRunner(){
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    });
    connectDB()
}

ServerRunner();