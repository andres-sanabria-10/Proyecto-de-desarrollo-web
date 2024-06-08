const Project = require('./../models/Project')
const Modality = require('./../models/Modality')
const { isObjectIdOrHexString } = require('mongoose')

module.exports = {
  findAll : async(req,res)=>{
    try{
      const result = await Project.find()

      return res.status(200).json({data:result})
    }catch(err){
      return res.status(500).json({"err":err})
    }
  },findById : async( req,res )=>{
    try{
      const {id} = req.params
      const result = await Modality.findById(id)

      return res.status(200).json({data:result})
    }catch(err){
      return res.status(500).json({error:err})
    }
  },
  save : async(req,res)=>{
    const {id} = req.params

    const project = new Project(req.body)

    try{   
      const modality = await Modality.findById(id)

      if( modality ){
        project.modality = id

        modality.projects.push( project )

        const result = await project.save(project)

        await modality.save(modality)

        return res.status(200).json({data:result})

      }else{
        return res.status(404).json({message:"Modalidad no Existe"}) 
      }
    }catch(err){
      console.log(`Error--${err}`)
      return res.status(500).json({err:err})
    } 
  },
  
}