
const jwt = require('jsonwebtoken')

class JwtService {
    generateToken(data)
    {
        return new Promise((resolve,reject) => {
            jwt.sign(data,process.env.JWT_SECRET,{expiresIn : 60},(err,token) => {
                if(err) return reject(err);
                resolve(token);
                console.log(token);
            })
        })
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
          });
        });
      }
    
      verifyToken(token) {
        return new Promise((resolve, reject) => {
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
          });
        });
      }
}

module.exports = JwtService