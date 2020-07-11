const bcrypt = require('bcrypt');

module.exports = {
    async generatePasswordHash(plainPassword) {
        let salt = bcrypt.genSaltSync(11);
        return bcrypt.hashSync(plainPassword, salt);
    },

    async comparePasswordHash(plainPassword, hash) {
        return bcrypt.compareSync(plainPassword, hash);
    },

    async generateVerifyCode() {
        return Math.floor(1000 + Math.random() * 9000);
    },

    hasDuplicates :(arr)=>{
        return new Set(arr).size !== arr.length; 
    }

}