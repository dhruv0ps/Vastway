const Permission = require("../config/models/permissionModel")
const Role = require("../config/models/roleModel")
const User = require("../config/models/userModel")
// const Supplier = require("../config/models/supplierModel")
const CryptService = require("../services/crypt-service")
const cryptService = new CryptService()
const mongoose = require('mongoose');

async function clearDatabaseAll() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        try {
            await collection.drop();
            // if (key === "products")
            console.log(`Collection ${key} dropped successfully`);
        } catch (error) {
            // If the collection doesn't exist, MongoDB will throw an error
            // We can safely ignore this error
            if (error.code === 26) {
                console.log(`Collection ${key} does not exist, skipping`);
            } else {
                console.error(`Error dropping collection ${key}:`, error);
                throw error;  // Re-throw the error if it's not a "collection doesn't exist" error
            }
        }
    }

    console.log('All collections have been dropped');
}

async function clearDatabase() {
    const collections = mongoose.connection.collections;
    const collectionsToClear = ["supplierorders", "orders", "routes", "logs"];

    for (const key in collections) {
        if (collectionsToClear.includes(key)) {
            const collection = collections[key];
            try {
                await collection.drop();
                console.log(`Collection ${key} dropped successfully`);
            } catch (error) {
                // If the collection doesn't exist, MongoDB will throw an error
                // We can safely ignore this error
                if (error.code === 26) {
                    console.log(`Collection ${key} does not exist, skipping`);
                } else {
                    console.error(`Error dropping collection ${key}:`, error);
                    throw error;  // Re-throw the error if it's not a "collection doesn't exist" error
                }
            }
        }
    }

    console.log('Specified collections have been dropped');
}


const initPermissions = async () => {
    const permissions = [
        // 'view_users', 'create_user', 'update_user', 'add_user', 
        'view_role', 'create_role', 'update_role', 'delete_role',
        'view_permission', 'create_permission', 'update_permission', 'delete_permission',
        'add_customers', 'view_customers', "edit_customers",
        'add_products', 'view_products', 'edit_products', 'delete_products',
        'add_order', 'view_order', 'edit_order',
        'view_payment', 'edit_payment', 'add_payment',
        'view_supplier', 'add_supplier', 'edit_supplier',
        'view_supplyOrder', 'edit_supplyOrder', 'add_supplyOrder',
        'add_route', 'view_route', 'edit_route',
        'add_loadSheet', 'view_loadSheet', 'edit_loadSheet',
        'add_tickets', 'view_tickets', 'edit_tickets',
        'add_inventory', 'view_inventory', 'edit_inventory',
        'add_invLocation', 'view_invLocation', 'edit_invLocation',
        'book_products', 'view_logs', 'damaged_products',

    ];

    for (const permissionName of permissions) {
        try {
            const existingPermission = await Permission.findOne({ name: permissionName });
            if (!existingPermission) {
                await Permission.create({ name: permissionName, description: `Permission to ${permissionName.replace('_', ' ')}` });
                console.log(`Added permission: ${permissionName}`);
            }
        } catch (error) {
            console.error(`Error adding permission ${permissionName}:`, error);
        }
    }

    console.log('Permissions initialization completed.');
};

async function createDefaultAdminUser() {
    const adminPermission = await Permission.findOne({ name: "Admin" })
    let id = ""
    if (adminPermission) {
        id = adminPermission._id
    } else {
        let pm = await Permission.create({
            name: "Admin",
            description: "Admin Access"
        })
        id = pm._id
    }
    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {

        adminRole = await Role.create({
            name: 'Admin',
            permissions: [id]
        });
    }

    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
        let crypted_pass = await cryptService.cryptify("myPassword@556")
        await User.create({
            username: 'Admin',
            email: 'ADMIN',
            password: crypted_pass,
            role: adminRole?._id
        });
        console.log('Default admin user created');
    }
}

async function createDefaultSupplier() {
    const existingSupplier = await Supplier.countDocuments();
    if (existingSupplier === 0) {
        await Supplier.create({
            name: "MEGA IMPORTS BRAMPTON",
            initials: "MI",
            phoneNumber1: "437255000",
            emailID: "info@brampton.ca",
            pickupLocation: {
                address: "650 Dixon Rd, Etobicoke, ON M9W 1J1, Canada",
                longitude: "-79.5777078",
                latitude: "43.69172529999999",
            },
            pickupGoogleMapLink: "https://www.google.com/maps?q=-79.5777078,43.69172529999999",
        });
        console.log("Default supplier created");
    }
}

async function _init_methods() {
    try {
        // await clearDatabase()
        await createDefaultAdminUser()
        await initPermissions()
        // await createDefaultSupplier()
    } catch (error) {
        console.log("Something went wrong", error)

    }
}

module.exports = _init_methods