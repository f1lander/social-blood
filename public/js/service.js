app.factory('DonorService', function($http){
        return{
            getDonors:function () {
                return $http.get('/api/donors');                 
            },
            addDonor:function (donor) {
                 return $http.post('/api/donors', {donor:donor});   
            },
            addBank:function (bank) {
                 return $http.post('/api/banks', {bank:bank});   
            },
             login:function (credentials) {
                 return $http.post('/api/banks/login', {user:credentials.user,password:credentials.pass});   
            },
             loginDonor:function (credentials) {
                 return $http.post('/api/donors/login', {email:credentials.user,password:credentials.pass});   
            },            
             requestBlood:function (_id) {
                 return $http.post('/api/banks/requestBlood', {id:_id, kmLimit:50000});   
            }
        };
    })