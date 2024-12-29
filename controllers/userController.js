const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');


// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400);
//     throw new Error('Email and password are required');
//   }

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       res.status(400);
//       throw new Error('Invalid email or password');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(400);
//       throw new Error('Invalid email or password');
//     }

//     const { password: _, ...userWithoutPassword } = user.toJSON();

//     const token = generateToken(user.id, user.userType, user.isTeamLead);
//     if (user.status !== 'active') {
//       res.status(500).json({
//         message: 'User is In Active Contact with Admin',
//         succeeded: false,
//       });
//     }
//     if (user.isTerminated === true) {
//       res.status(500).json({
//         message: 'User is Terminated, Contact with Admin',
//         succeeded: false,
//       });
//     }
//     res.status(200).json({
//       message: 'Login successful',
//       succeeded: true,
//       user: { ...userWithoutPassword, token: token },
//     });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500);
//     throw new Error('Server error');
//   }
// });

const signUp = asyncHandler(async (req, res) => {
    try {
        const { name, userType, email, cnic, phone, status } = req.body;

        // Debug log to check incoming data
        console.log('Incoming data:', { name, userType, email, cnic, phone, status });

        // Validate required fields
        if (!name || !email || !phone || !cnic || !status) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }


        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if user with the same CNIC already exists
        const existingCnic = await User.findOne({ where: { cnic } });
        if (existingCnic) {
            return res.status(400).json({ message: "CNIC already exists" });
        }

        // Check if user with the same phone number already exists
        const existingPhone = await User.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone already exists" });
        }

        // Create a new user
        const newUser = await User.create({
            name,
            userType,
            email,
            cnic,
            phone,
            password,
            status,
        });

        // Respond with success if user creation succeeds
        if (newUser) {
            return res.status(201).json({
                data: { newUser },
                succeeded: true,
                message: "User created successfully",
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "An internal error occurred" });
    }
});

// const registerUser = asyncHandler(
//   async (req, res) => {
//     const { name, email, password, avatar, userType } = req.body;

//     if (!name || !email || !password) {
//       res.status(400)
//       throw new Error("Please fill all required fields");
//     }

//     if (password.length < 8) {
//       res.status(400)
//       throw new Error("Password must be up to 8 characters");
//     }
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       res.status(400)
//       throw new Error("User already exists");
//     }
//     const hashedPassword = await hashPassword(password);
//     const newUser = await User.create({
//       name,
//       email,
//       password: password,
//       avatar,
//       userType
//     });

//     if (newUser) {
//       res.status(200).json({
//         data: {
//           name,
//           email,
//           avatar,
//           userType
//         },
//         succeeded: true,
//         message: "User registered successfully"
//       });
//     } else {
//       res.status(400)
//       throw new Error("Invalid user data");
//     }
//   }
// );




// // const logoutUser = (req, res) => {

// //   res.status(200).json({ message: 'Logout successful' });
// // };
// const updateUser = asyncHandler(
//   async (req, res) => {
//     try {

//       const { teamLeadId, id, name, email, password, avatar, userType, cnic, cnic_front, cnic_back, phone, joiningDate, terminatedDate, status, isTeamLead, isTerminated } = req.body;

//       const user = await User.findByPk(id);
//       if (!user) {
//         res.status(404);
//         throw new Error("User not found");
//       }
//       if (isTerminated === true) {
//         status = 'inactive'
//       }
//       if (name) user.name = name;
//       if (email) user.email = email;
//       if (password) {
//         user.password = await hashPassword(password);
//       }
//       if (avatar) user.avatar = avatar;
//       if (userType) user.userType = userType;
//       if (cnic) user.cnic = cnic;
//       if (cnic_front) user.cnic_front = cnic_front;
//       if (cnic_back) user.cnic_back = cnic_back;
//       if (phone) user.phone = phone;
//       if (joiningDate) user.joiningDate = joiningDate;
//       if (terminatedDate) user.terminatedDate = terminatedDate;
//       if (status) user.status = status;
//       if (teamLeadId) user.teamLeadId = teamLeadId;
//       if (isTeamLead !== undefined) user.isTeamLead = isTeamLead;
//       if (isTerminated !== undefined) user.isTerminated = isTerminated;
//       await user.save();
//       res.status(200).json({
//         data: user,
//         succeeded: true,
//         message: "User updated successfully"
//       });

//     } catch (error) {
//       console.error("Error updating user:", error);
//       res.status(500).json({ message: "An internal error occurred" });
//     }
//   }
// );
// const getUserById = asyncHandler(
//   async (req, res) => {
//     try {
//       const { id } = req.params;

//       const user = await User.findByPk(id);
//       if (!user) {
//         res.status(404);
//         throw new Error("User not found");
//       }


//       res.status(200).json({
//         data: user,
//         succeeded: true,
//         message: "User fetched successfully"
//       });

//     } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "An internal error occurred" });
//     }
//   }
// );


// const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     await user.destroy();
//     res.status(200).json({
//       data: user,
//       succeeded: true,
//       message: "User deleted successfully"
//     });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

module.exports = {signUp};