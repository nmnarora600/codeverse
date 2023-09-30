
import * as fs from 'fs/promises'

const handler= async(req,res)=>{
try {
    const heading=req.query.heading;
    if(! heading){
        throw new Error("File not Found");
    }
    const data= await fs.readFile(`blogdata/${heading}.json`,'utf-8')
    let resp=await JSON.parse(data);

 
    
    res.status(200).json(resp);

} catch (error) {
    
    return res.status(500).json({error:"Internal Server Error"});
}
   
   
}

export default handler;