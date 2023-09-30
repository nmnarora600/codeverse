import * as fs from 'fs/promises'

const postcontact = async (req,res) => {
  if(req.method==='POST'){
    let x=req.body;
   
    let existingData=[];
try {
    let readfile= await fs.readFile(`contactdata/${x.email}.json`,'utf-8');
    // console.log(typeof readfile)
    let y=await JSON.parse(readfile)
   existingData=y;
   
} catch (error) {
    existingData=[];
}
// let updatedData= {...existingData, ...req.body}
existingData.push(req.body);
existingData= JSON.stringify(existingData)


// console.log(updatedData)
    await fs.writeFile(`contactdata/${x.email}.json`,existingData);
    return res.status(200).json(["yes post req"])
  }
  else{
   return res.status(200).json(["allblogs"])
  }
}

export default postcontact