const User = require('../models/user');
const Role = require('../models/role');
const Referral = require('../models/referral');
const InternalOrderHistory = require('../models/internalOrderHistory');
const { sendEmail } = require('../utils/index');
const Token = require('../models/token');
const { default: mongoose } = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Wallet = require('../models/wallet');

const ObjectId = mongoose.Types.ObjectId;

// const ethNetwork = 'https://mainnet.infura.io/v3/584de1617d454c9d83afb36a249a1942'; // Mainnnet

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
    // console.log("Here I am!");
    const users = await Referral.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            },
        },
        { $unwind: '$users' },
        {
            $match: {
                "users.isDeleted": false
            }
        },
    ])
    res.status(200).json({ users });
};

// @route POST api/user/add
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
    try {
        const { email } = req.body;
        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });
        if (user) return res.status(401).json({ message: 'The email address you have entered is already associated with another account. You can change this users role instead.' });
        const password = '_' + Math.random().toString(36).substr(2, 9); //generate a random password
        const newUser = new User({ ...req.body, password, email });
        if (req.body.roleId) {
            newUser.roleId = req.body.roleId
        }
        //Generate and set password reset token
        newUser.generatePasswordReset();
        const newUserRecord = await newUser.save();
        res.json(newUserRecord);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findOne({ '_id': id });
        if (!user) return res.status(401).json({ message: 'User does not exist' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.singleSubAdmin = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: ObjectId(id) })
        if (!user) return res.status(401).json({ message: 'User does not exist' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        if (req.file) {
            update.profileImage = req.file.filename
        }
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });
        // const userData = await Referral.aggregate([
        //     {
        //         $match: {
        //             userId: ObjectId(user._id)
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: 'userId',
        //             foreignField: '_id',
        //             as: 'users'
        //         }
        //     },
        //     { $unwind: '$users' }
        // ])
        //if there is no image, return success message
        // if (user) return res.status(200).json({ user: userData, message: 'User has been updated' });
        if (user) return res.status(200).json({ user: user, message: 'User has been updated' });

        // const user_ = await User.findByIdAndUpdate(id, { $set: update }, { $set: { profileImage: result.url } }, { new: true });

        // if (!req.file) return res.status(200).json({ user: user_, message: 'User has been updated' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const updated = await User.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });
        if (updated) return res.status(200).json({ updated, message: 'User deleted' });
        res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route Destroy api/hard-delete-user/{id}
// @desc Delete User and his Wallets
// @access Public
exports.hard_destroy = async function (req, res) {
    try {
        const id = req.params.id;
        var wallet = true;
        while (wallet) {
            wallet = await Wallet.findOneAndDelete({ userId: id });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.recover = async function (req, res) {
    try {
        const id = req.params.id;
        const updated = await User.findByIdAndUpdate(id, { $set: { isDeleted: false } }, { new: true });
        if (updated) return res.status(200).json({ updated, message: 'User recovered' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id }).exec();
        let hashedOldPass = 0;
        if (user) {
            if (req.body.oldPassword) {
                bcrypt.compare(
                    req.body.oldPassword,
                    user.password,
                    async (err, result) => {
                        if (err || !result) {
                            return res.status(403).send({
                                status: 403,
                                message: "You entered incorrect old password!",
                            });
                        } else {
                            let hash = 0;
                            if (req.body.password) {
                                const salt = await bcrypt.genSalt(10);
                                hash = await bcrypt.hash(req.body.password, salt);
                            }
                            var update = await User.findByIdAndUpdate(id, {
                                password: hash,
                            });
                            return res.status(200).json({
                                status: 200,
                                user: update,
                                message: "Password changed successfully!",
                            });
                        }
                    }
                );
            }
        } else {
            return res.status(403).json({
                status: 200,
                message: "User not found!",
            });
        }

    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

exports.forgetPassword = async function (req, res) {
    try {
        if (req.body) {
            if (req.body.password === req.body.confirmPassword) {
                const tokenData = await Token.findOne({ token: req.body.token })
                const filter = { _id: tokenData.userId }
                const updateUser = await User.findOne(filter)
                updateUser.password = req.body.password
                updateUser.save()
            } else {
                res.send("Password didn't matched");
            }
            res.send("Password changed successfully");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.forgetPasswordEmail = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user && !mongoose.Types.ObjectId.isValid(user._id))
            return res.status(400).send("user with given email doesn't exist");
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = process.env.SITE_URL + "/forget-password/" + token.token;
        const to = user.email
        const from = process.env.FROM_EMAIL
        const subject = "Password reset"
        const html = link
        await sendEmail({ to, from, subject, html });
        res.send("password reset link sent to your email account");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 0 = All users
// 1 = Master
// 2 = Master Partners
// 3 = Slaves
exports.usersAgainstRole = async (req, res) => {
    try {
        const role_id = req.body.role_id;
        const user_id = req.body.user_id;
        const role = await Role.findOne({ _id: role_id });
        let userType = req.body.userType;
        if (userType == 0) {
            queryObject = {
                $or: [{ userType: "Master" }, { userType: "Partner" }, { userType: "Slave" }],
            };
        } else {
            if (userType == 1) {
                userType = "Master"
            } else if (userType == 2) {
                userType = "Partner"
            } else if (userType == 3) {
                userType = "Slave"
            }
            queryObject = {
                userType: userType,
            };
        }
        if (role.name == 'Admin' || role.name == 'Sub Admin') {
            let data = await Referral.aggregate(
                [
                    {
                        $match: queryObject,
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'users'
                        },
                    },
                    { $unwind: '$users' },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'refererId',
                            foreignField: '_id',
                            as: 'referer'
                        },
                    },
                    {
                        $unwind: {
                            path: '$referer',
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $match: {
                            "users.isDeleted": false
                        },
                    },
                ],
            );
            return res.status(200).json({ status: 200, referral: data });
        }
        else {
            let data2 = await Referral.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'users'
                    },
                },
                {
                    $match: {
                        refererId: ObjectId(user_id),
                    }
                },
                {
                    $match: {
                        "users.isDeleted": false
                    },
                },
                {
                    $match: queryObject,
                },

                { $unwind: '$users' },

            ])
            return res.status(200).json({ status: 200, referral: data2 });
        }
    } catch (e) {
        return res.status(200).send({ status: 400, message: "No user found!" });
    }
}

exports.forgetPassword = async function (req, res) {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.referralsAgainstId = async function (req, res) {
    try {
        const id = req.params.id;
        const referral = await Referral.aggregate([
            {
                $match: {
                    refererId: ObjectId(id),
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users'
                },
            },
            { $unwind: '$users' }
        ])
        res.status(200).json({ referral });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.subadminsListing = async (req, res) => {
    try {
        let subAdmins = await User.aggregate(
            [
                {
                    $match: {
                        roleId: ObjectId("622620a5c39682062e42a680"),
                        isDeleted: false
                    }
                },
            ],

            async function (err, documents) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                    return;
                } else {
                    return res.status(200).json({ status: 200, subAdmins: documents });
                }
            }
        );
    } catch (e) {
        return res.status(200).send({ status: 400, message: "No user found!" });
    }
}

exports.subadminsListing = async (req, res) => {
    try {
        await User.aggregate(
            [
                {
                    $match: {
                        roleId: ObjectId("622620a5c39682062e42a680"),
                        isDeleted: false
                    }
                },
            ],

            async function (err, documents) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                    return;
                } else {
                    return res.status(200).json({ status: 200, subAdmins: documents });
                }
            }
        );
    } catch (e) {
        return res.status(200).send({ status: 400, message: "No user found!" });
    }
}
exports.deletedSubadmins = async (req, res) => {
    try {
        await User.aggregate(
            [
                {
                    $match: {
                        roleId: ObjectId("622620a5c39682062e42a680"),
                        isDeleted: true
                    }
                },
            ],

            async function (err, documents) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                    return;
                } else {
                    return res.status(200).json({ status: 200, subAdmins: documents });
                }
            }
        );
    } catch (e) {
        return res.status(200).send({ status: 400, message: "No user found!" });
    }
}

exports.deletedUsers = async (req, res) => {
    try {
        const users = await Referral.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users'
                },
            },
            { $unwind: '$users' },
            {
                $match: {
                    "users.isDeleted": true
                }
            },
        ])
        res.status(200).json({ users });

    } catch (e) {
        return res.status(200).send({ status: 400, message: "No user found!" });
    }
}

// @route GET api/user/user-details/{id}
// @desc Returns a specific user
// @access Public
exports.userDetails = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.aggregate([
            {
                $match: {
                    _id: ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'referrals',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'ref'
                },
            },
            {
                $lookup: {
                    from: 'referrals',
                    localField: '_id',
                    foreignField: 'refererId',
                    as: 'referals'
                },
            },
            {
                $lookup: {
                    from: 'externaltransactions',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'externalTransactions'
                },
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'account'
                },
            },
            {
                $unwind: '$ref'
            },
            {
                $unwind: '$account'
            }
        ])
        if (!user) return res.status(401).json({ message: 'User does not exist' });

        let internals = await InternalOrderHistory.aggregate([
            {
                $match: {
                    userId: ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'fromCurrency',
                    foreignField: '_id',
                    as: 'fromCurrency'
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'toCurrency',
                    foreignField: '_id',
                    as: 'toCurrency'
                }
            },
            {
                $unwind: '$fromCurrency'
            },
            {
                $unwind: '$toCurrency'
            }
        ])
        let data = user?.[0];
        data['internalTransaction'] = internals;

        res.status(200).json({ user: data });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};