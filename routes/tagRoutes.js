import express from 'express';
import Tag from '../models/tag.js';
const router = express.Router();

//GET /tags
router.get('/:userid', async (req,res) => {
  try {
    const {userid} = req.params;
    const tag = await Tag.find({user_id:userid, is_active: true});
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve tags', error: error.messages})
  }
});

//GET ALL active /tags
router.get('/', async (req,res) => {
  try {
    const tag = await Tag.find({is_active: true});
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve tags', error: error.messages})
  }
});

//POST /tags
router.post('/', async (req, res) => {
  try {
    const {color, tag_name, user_id } = req.body;
    const newTag = new Tag({
      color, tag_name, user_id
    });
    await newTag.save();

    res.status(201).send({
      message: 'New tag created',
      data: newTag
    });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to create tag',
      error: error.message
    });
  }
});

//GET /tags/:id
router.get('/:id/edit', async (req, res) => {
  try {
    const {id} = req.params;
    const tag = await Tag.find({_id:id});
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve tags', error: error.messages})
  }
});

//PUT /tags/:id
router.put('/:id', async (req,res) => {
  try {
    const {id} = req.params;
    const {tag_name,color} = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(id,{ tag_name, color});
    
    if(!updatedTag){
      return res.status(404).json({message:'Tag not found'});
    }

    res.status(201).json({
      message: 'Tag updated',
      data: updatedTag
    });
  
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update tag',
      error: error.message
    })
  }
});

//DELETE /tags/:id
router.put('/:id/archive', async (req, res) => {
  try {
    const {id} = req.params;
    const {is_active} = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(id,{ is_active});
    
    if(!updatedTag){
      return res.status(404).json({message:'Tag not found'});
    }

    res.status(201).json({
      message: 'Tag archived',
      data: updatedTag
    });
  
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update tag',
      error: error.message
    })
  }
});



export default router;