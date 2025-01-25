const bcrypt = require('bcryptjs')

exports.plainToHash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash_pass = await bcrypt.hash(password, salt)
    return hash_pass
}

exports.hashToPlain = async (password, hash_pass) => {
    const output = await bcrypt.compare(password,hash_pass)
    return output
}