

class User {
    constructor(id, emailAddress, password ){
        this.id = id;
        this.emailAddress = emailAddress
        this.password = password
        this.MatchPassword = MatchPassword;
    } 
    getUserId() {
        return this.id
    }
  

    getEmailAddress(){
        return this.emailAddress;
    }

    getPassword(){
        return this.password
    }

    getMatchPassword(){
        return this.MatchPassword;
    }
}
