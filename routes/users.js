const router = require('express').Router();
const User = require('../models/User');

router.get("/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt,...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        return res.status(500).json(err);
    }
});

router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("アカウントが更新されました");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res
            .status(403)
            .json("アカウントを更新できません");
    }
});

router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("アカウントが削除されました");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res
            .status(403)
            .json("アカウントを削除できません");
    }
});
module.exports = router;