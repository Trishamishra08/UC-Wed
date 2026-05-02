const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../modules/user/user.model');

const initializeAdmin = async () => {
    try {
        const adminEmail = 'a@gmail.com';
        const adminPass = '1234';

        console.log('⏳ Re-initializing admin user (Force Fresh)...');
        await User.deleteOne({ email: adminEmail });
        
        const admin = new User({
            name: 'Admin',
            email: adminEmail,
            phone: '9999999999',
            password: adminPass, // Model handles hashing automatically
            city: 'Admin City',
            role: 'admin',
            isEmailVerified: true,
            isPhoneVerified: true
        });

        await admin.save();
        console.log('✅ Fresh admin user created (a@gmail.com / 1234)');
    } catch (error) {
        console.error('❌ Admin initialization failed:', error.message);
    }
};

module.exports = initializeAdmin;
