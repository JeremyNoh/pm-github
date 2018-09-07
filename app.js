var {ipcRenderer, remote} = require('electron');
var main = remote.require("./main.js");
const axios = require('axios');


function SearchPressEnter(e) {
    if (e.keyCode == 13 ) {
        var Value = document.getElementById("mySearch").value;
        ipcRenderer.send('async', Value);

        getRepos(Value)
    }
}

function buttonSearch() {
        var Value = document.getElementById("mySearch").value;
        ipcRenderer.send('async', Value);

        getRepos(Value)

}


function getRepos(value){
  axios.get(`https://api.github.com/users/${value}/repos`)
    .then(function (response) {
      if (response.data) {
        var nameRepo =  []
        var data = []
        var OneRepo = ''
        document.getElementById("demo").innerHTML = '';
         data = response.data
         console.log(data);
        for (var i = 0; i < data.length; i++) {
          nameRepo.push(data[i].name)
           OneRepo =
           `<div class="card">
             <div class="card-content">
               <p class="title">
                 ${data[i].name}
               </p>
               <p class="subtitle">
               </p>
             </div>
             <footer class="card-footer">
               <p class="card-footer-item">
                 <span>
                  ${data[i].created_at}
                 </span>
               </p>
               <p class="card-footer-item">
                 <span>
                  ${data[i].language}
                 </span>
               </p>
             </footer>
           </div><br/><br/>`
          document.getElementById("demo").innerHTML += OneRepo;

        }
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
