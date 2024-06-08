const { isObjectIdOrHexString } = require('mongoose')
const Modality = require('./../models/Modality')

module.exports = {
  findAll : async(req,res)=>{
    try{
      const result = await Modality.find({}).populate('projects')
      //const result = await Modality.find({})

      return res.status(200).json({data:result})
    }catch(err){
      return res.status(500).json({err:err})
    }
  },
  save : async(req,res)=>{
    try{
      const modality = new Modality(req.body)

      //TODO. validar que el código no exista, si existe return 201
      const result = await modality.save()

      return res.status(201).json({data:modality})
    }catch(err){
      return res.status(500).json({err:err})
    } 
  },
  findById : async( req,res )=>{
    try{
      const {id} = req.params
      const result = await Modality.findById(id)

      return res.status(200).json({data:result})
    }catch(err){
      return res.status(500).json({error:err})
    }
  },
  update : async(req,res)=>{
    try{
      const {id} = req.params
      const {name} = req.body;
      
      const query = await Modality.findById(id)

      if( query ){
        const filter = {_id:id}
        const update = {name:name}

        const result = await Modality.findByIdAndUpdate(filter,update)

        return res.status(200).json({data:result})
      }else{
        
        return res.status(404).json({msg:"El ObjectId no Existe"})
      }
    }catch(err){
      return res.status(500).json({error:err})
    }
  },

  erase : async (req,res)=>{
    const {id} = req.params;
    try {
      const record = await Modality.findById(id) 

      if( record ){

        if( record.projects.length == 0 ){

          const result = await Modality.findByIdAndDelete(id)
          
          return res.status(200).json({data:result})
        }else{
          return res.status(101).json({message:"El Registro contiene Proyectos"})
        }
      }else{
        return res.status(404).json({msg:"El ObjectId no Existe"}) 
      }
      
    } catch (error) {
      return res.status(500).json({error:error})
    }

  }
}