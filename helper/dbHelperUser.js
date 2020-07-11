const mongoose = require('mongoose');
const { UserModel } = require("../schema/user")
const console = require('../logger');
const { COLLECTIONS } = require('../config/constant');
const messages = require('../config/messages');

class DbHelper {

    async connect() {
        if (!this.db) {
            try {
                await mongoose.connect(`${process.env.NODE_ENV == 'production' ? process.env.DB_PRODUCTION_URI : process.env.DB_STAGING_URI}`, { useNewUrlParser: true });
                this.db = mongoose.connection;
                console.log("MongoClient Connection successfull.");
                return;
            } catch (e) {
                console.error("DbHelper Error while connect mongodb ::: ", e);
                throw Error(e)
            }
        }
    }


    async insertDocument(collection, docObj) {
        try {
            if (Object.keys(docObj).length === 0 && docObj.constructor === Object) {
                throw Error("mongoClient.insertDocumentWithIndex: document is not an object");
            }
            let modelInstance;
            if (collection == COLLECTIONS.USER_COLLECTION_NAME) {
                modelInstance = new UserModel(docObj);
            } else {
                throw Error(messages.error.INVALID_COLLECTION);
            }
            await this.connect();
            return await modelInstance.save()
        } catch (e) {
            console.error("DbHelper mongoClient.insertDocumentWithIndex: Error caught,", e);
            throw Error(e)
        }
    }

    async updateDocument(collection, _id, data) {
        try {
            let Model;
            if (collection == COLLECTIONS.USER_COLLECTION_NAME) {
                Model = UserModel;
            } else {
                throw Error(messages.error.INVALID_COLLECTION);
            }
            await this.connect();
            return await Model.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, data, { new: false })
        } catch (e) {
            console.error("DbHelper Error while updateDocument ::: ", e);
            throw (e)
        }
    }

    async getUserById(_id) {
        try {
            await this.connect();
            let userData = await UserModel.findOne({
                _id: mongoose.Types.ObjectId(_id)
            })
            return userData
        } catch (e) {
            console.error("DbHelper Error while getUserById ::: ", e);
            throw (e)
        }
    }

    async getUserByEmail(email) {
        try {
            await this.connect();
            let userData = await UserModel.findOne({ email })
            return userData
        } catch (e) {
            console.error("DbHelper Error while getUserByEmail ::: ", e);
            throw (e)
        }
    }

    async close() {
        return await this.db.close()
    }

    async createIndex(coll) {
        return await this.db.collection(coll).createIndex({ email: 1 }, { collation: { locale: "fr" }, unique: true })
    }
}

module.exports = {
    DbHelper
}