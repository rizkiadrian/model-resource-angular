var app = angular.module('module_crud',['ngResource']);
app.factory('mahasiswasrvcs',mahasiswasrvcs);

function mahasiswasrvcs($resource){
    //auth error server "\xA4" ASCII-8BIT to UTF-8

    //fails convert from ascii to utf

    //use window.btoa() , this method will Creates a base-64 encoded ASCII string from a "string" of binary data

    //because in api server only know this encode (if send via header)

    var auth = window.btoa("rizkiadrian" + ':' + "12345678");
    var base_url = 'http://localhost:8000/';

 function httpRequest(methodType,subDomain){
    return {
        method :methodType,
        url : base_url + subDomain,
        isArray : false,
        headers :{
            'Authorization' : 'Basic'+auth,
            'Accept' : 'application/json',
            'Content-Type' : 'application/json; charset=UTF-8',

        },
        params : {
            id : '@id',
            NRP : '@NRP',
            Nama : '@Nama',
            email : '@email',
        }
    };

 }

 return $resource('',{},{
    'index' : httpRequest('GET','api/mahasiswa'),
    'show' : httpRequest('GET','api/mahasiswa/:id'),
    'save' : httpRequest('POST','api/mahasiswa'),
    'update' : httpRequest('PUT','api/mahasiswa/:id'),
    'destroy' : httpRequest('DELETE','api/mahasiswa/:id'),
 });
}

//create controller that injected crud services

var app_controller = angular.module('module_controller',['module_crud']);
app_controller.controller('MahasiswaController',MahasiswaController);

function MahasiswaController($scope,mahasiswasrvcs){
$scope.mahasiswas = {};
$scope.saveMahasiswa = function (){
    $scope.mahasiswa = mahasiswasrvcs.save({
      NRP : $scope.mahasiswa.NRP,
      Nama : $scope.mahasiswa.Nama,
      email : $scope.mahasiswa.email,  
    });
};

$scope.listMahasiswa = function (){
    $scope.mahasiswas = mahasiswasrvcs.index();
    
    
};

$scope.showMahasiswa = function (){
    $scope.mahasiswa = mahasiswasrvcs.show({
        id : $scope.mahasiswa.id
    });
};

$scope.updateMahasiswa = function (){
    $scope.mahasiswa = mahasiswasrvcs.update({
        id : $scope.mahasiswa.id,
        NRP : $scope.mahasiswa.NRP,
        Nama : $scope.mahasiswa.Nama,
        email : $scope.mahasiswa.email,
    });
};

$scope.deleteMahasiswa = function (){
   if($scope.mahasiswa.id === null){
    $scope.mahasiswa.id = 0;
   }
   $scope.mahasiswa = mahasiswasrvcs.destroy({
    id : $scope.mahasiswa.id
   });
};

}