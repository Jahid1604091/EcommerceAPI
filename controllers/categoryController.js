import categoryModel from "../models/categoryModel.js"

export const createCategory = async (req,res) =>{
    
    try {
        const categories = await categoryModel.find();
        if(categories.length >0){
            let checking = false;
            for(let i=0; i< categories.length; i++){
                if(categories[i]['category'].toLowerCase() === req.body.category.toLowerCase()){
                    checking = true;
                    break;
                }
            }

            if(!checking){
                const newCat = new categoryModel({...req.body});
                const data = await newCat.save();
                res.status(201).json({success:true, data})
            }
            else{
                res.status(400).json({success:false,message:'Already Exist Category'})
            }
        }
        else{
            const newCat = new categoryModel({...req.body});
            const data = await newCat.save();
            res.status(201).json({success:true, data})
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}