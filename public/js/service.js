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
            }
        };
    })