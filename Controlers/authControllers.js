import { ComparePassword, HashPassword } from "../Helpers/authHelper.js";
import userModal from "../Modal/userModal.js"
import JWT from 'jsonwebtoken'


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        if (!name) {
            return res.send({ massage: "name is required" })
        }
        if (!email) {
            return res.send({ massage: "email is required" })
        }
        if (!password) {
            return res.send({ massage: "password is required" })
        }
        if (!phone) {
            return res.send({ massage: "phone no. is required" })
        }
        if (!answer) {
            return res.send({ massage: "answer is required" })
        }
        if (!address) {
            return res.send({ massage: "address is required" })
        }
        // check existing user
        const ecxistingUser = await userModal.findOne({ email });
        // existing user 
        if (ecxistingUser) {
            return res.status(200).send({
                success: false,
                massage: "user Alreday existing Please Login"
            })
        }
        // hashpassword
        const hashedPassword = await HashPassword(password)
        // ragisterUser
        const user = await new userModal({ name, email, password: hashedPassword, phone, address, answer }).save();
        res.status(201).send({
            success: true,
            massage: "succesfully ragistered",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in ragisterControler",
            error
        })
    }
}

// Login || POST

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                massage: "invalid email or password"
            })
        }
        // find User
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                massage: "user not found"
            });
        }
        // Password match
        const matchPass = await ComparePassword(password, user.password)
        if (!matchPass) {
            return res.status(200).send({
                success: false,
                massage: "incorrect password"
            });
        }
        // Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECTREAT, {
            expiresIn: "7d"
        })

        // Succesfully logedIN 
        res.status(200).send({
            success: true,
            massage: "suceesfully logIn",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }, token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in login",
            error
        })
    }
}
// forgotpasswordController || POST
export const forgotpasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "email is Required" })
        }
        if (!answer) {
            res.status(400).send({ message: "answer is Required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "newPassword is Required" })
        }

        // Check
        const user = await userModal.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong mail or answer"
            })
        }
        const hashed = await HashPassword(newPassword);
        await userModal.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "password changed succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                Sucess: false,
                message: "something Went wrong In forgotpasswordController",
                error: error
            })


    }
}

// test Controllers
export const testControllers = (req, res) => {
    res.send("Protected Routes")
} 
