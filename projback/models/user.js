
const uuidv4= require('uuid/v4');
uuidv4();
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true,
        maxlength:10,
        trim:true
    }
    ,

    lastName:{
        type:String,
        required:true,
        maxlength:10,
        trim:true
    }
    ,
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    userInfo:{
        type:String,
        required:true
    }
    ,
    enc_password:{
        type:String,
        required:true
    },
    salt:String,
    Role:{//role decide which is user and which is higher authority according to number
        type:Number,
        default:0
    }
    ,
    purchase:{
        type:Array,
        default:0
    }


},{timeStamp:true});
// timestamp will store the time of creation of document and time of updation also.
// virtual field is set..It is logically exist and not present in database.

/*userSchema.virtual("password").set(function(password){
    this._password= password;// private field declaration.
    this.salt= uuidv4();// hexadecimal string
    this.enc_password= this.securePassword(password);
    console.log(this.enc_password)
})
.get(function(){
    return this._password;
})*/

// to call the method to generate the encrypted password
/*userSchema.methods={

    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.enc_password;// if generate hasing value equals
        // to store hashing value then it will match.
    },
    securePassword:function (plainpassword){
        if(!plainpassword){
            return "";
        }
        else{
            try{
                return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)// plain text
                .digest('hex');
            }
            catch(err){

                return "";

            }
        }


    }
}
*/
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.enc_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

    userSchema.methods.generateAutheticate= function(plainpassword){
    
      return this.securePassword(plainpassword) === this.enc_password;
    }
  
   userSchema.methods. securePassword= function(plainpassword) {
      if (!plainpassword) return "";
      else{
      try {
        return crypto
          .createHmac("sha256", this.salt)
          .update(plainpassword)
          .digest("hex");
      } catch (err) {
        return "";
      }
    }
}
  
module.exports= mongoose.model('user',userSchema);