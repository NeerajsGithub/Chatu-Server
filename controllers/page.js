import { User } from '../modals/page.js'
import bcrypt from 'bcrypt'

export const get = (req,res) => {
    res.send('<h1>Hello</h1>')
}  

export const createuser = async (req,res) => {
    try {
        const { name, email, password } = req.body;
  
        const existingName = await User.findOne({ name: name });
  
        if (existingName) {
          res.status(400).json({ success: false, message: "Name already exists"});
          return;
        }
        else {
          const existingEmail = await User.findOne({ email:email });
  
        if (existingEmail) {
          res.status(401).json({ success: false, message: 'Email already exists' });
          return;
        }
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedid = await bcrypt.hash(name, 10);
    
        const newUser = new User({
          id: hashedid,
          name: name,
          email: email,
          password: hashedPassword,
        });
    
    
        const user = await newUser.save();
    
        res.status(200).json({ success: true, message: 'Operation completed successfully' });
  
      } catch (error) {
        console.log('Error processing data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
}

export const checklogin = async (req,res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user || Object.keys(user).length === 0) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }      
    else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.status(200).json({ userId : user.id , userName : user.name});
      } else {
        res.status(400).json({ success: false, message: 'Invalid password' });
      }
    }


  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}