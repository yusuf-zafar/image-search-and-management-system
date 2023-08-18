

module.exports = function verifyToken(req,res,next){
  let token = req.headers["authorization"]
  if(token){
      token = token.split(' ')[1];
      Jwt.verify(token,jwtKey,(err,valid)=>{
          if(err){
              res.status(401).send({result:"please provide valid token"})
          }else{
              next();
          }
      })
  }else{
      res.status(403).send({result:"please add token with header"})
  }
  console.warn("middelware called", token)
}
