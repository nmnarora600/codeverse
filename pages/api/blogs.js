import * as fs from 'fs/promises'

const index = async(req,res) => {
  try {

    let datapath="blogdata"
let files= await fs.readdir(datapath);
files=files.slice(0,parseInt(req.query.count))
let allblogs=[];

for (let index = 0; index < files.length; index++) {
  const file = files[index];
  let ablog=await fs.readFile((datapath+"/"+file),'utf-8')

  ablog=await JSON.parse(ablog)
  
  allblogs.push(ablog)
}

res.status(200).json(allblogs)
  } catch (error) {
    res.status(500).json({error:"Internal Server Error"})
  }

}

export default index