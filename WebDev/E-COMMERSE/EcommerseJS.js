      // As only one product can be focused at a time, this global variable will store
      // the start time for the calculation of time spent by the user on each product...
      var startTime;

      // A user can search same item multiple times, but we must not store duplicate searched items
      searchedList = [];
      // localStorage.setItem("searchItems", searchedList);
      sessionStorage.setItem("searchItems", searchedList);

      // This function will validate if the given email contains '@', if not,
      // it will mark the input field with red border
      function validateEmail(){
        var emailInputField = document.querySelector('.form-control');
        let email = emailInputField.value;
        if(email.indexOf('@') == -1){
          emailInputField.classList.add("borderStyle");
        }
      }

      // If the email did not contain @ in the last input, the user can re-enter the correct.
      // On his attempt to correct the email by putting in @, the red border mark must be gone
      function clickEvent(){
        let emailInputField = document.querySelector('.form-control');
        if(emailInputField.classList.contains("borderStyle")){
          emailInputField.classList.remove("borderStyle");
        }
      }


      // Each set of mouseonItem and mouseOutOnItem accomplishes 2 tasks
      // 1. marks blue border around element on hovering over a item
      // 2. calculates the time spent by a user on the focused item
      function mounseOnTomato(){
        startTime = new Date().getTime();
        var panelElem = document.querySelector(".tomato-panel");
        panelElem.classList.add("panelBorder");
      }

      function mounseOutOnTomato(){
        var panelElem = document.querySelector(".tomato-panel");
        if(panelElem.classList.contains("panelBorder")){
          panelElem.classList.remove("panelBorder");
        }        
        var timeSpent = (new Date().getTime()- startTime)/1000;
        console.log("time spent on Tomato: " + timeSpent + "s");
      }

      function mounseOnCucumber(){
        startTime = new Date().getTime();
        var panelElem = document.querySelector(".cucumber-panel");
        panelElem.classList.add("panelBorder");
      }

      function mounseOutOnCucumber(){
        var panelElem = document.querySelector(".cucumber-panel");
        if(panelElem.classList.contains("panelBorder")){
          panelElem.classList.remove("panelBorder");
        }       
        var timeSpent = (new Date().getTime()- startTime)/1000;
        console.log("time spent on Cucumber: " + timeSpent + "s");         
      }      

      function mounseOnChilly(){
        startTime = new Date().getTime();
        var panelElem = document.querySelector(".chilly-panel");
        panelElem.classList.add("panelBorder");
      }

      function mounseOutOnChilly(){
        var panelElem = document.querySelector(".chilly-panel");
        if(panelElem.classList.contains("panelBorder")){
          panelElem.classList.remove("panelBorder");
        }    
        var timeSpent = (new Date().getTime()- startTime)/1000;
        console.log("time spent on Chilli: " + timeSpent + "s");            
      }

      function mounseOnMango(){
        startTime = new Date().getTime();
        var panelElem = document.querySelector(".mango-panel");
        panelElem.classList.add("panelBorder");
      }

      function mounseOutOnMango(){
        var panelElem = document.querySelector(".mango-panel");
        if(panelElem.classList.contains("panelBorder")){
          panelElem.classList.remove("panelBorder");
        }     
        var timeSpent = (new Date().getTime()- startTime)/1000;
        console.log("time spent on Mango: " + timeSpent + "s");           
      }

      function mounseOnStrawberry(){
        startTime = new Date().getTime();
        var panelElem = document.querySelector(".strawberry-panel");
        panelElem.classList.add("panelBorder");
      }

      function mounseOutOnStrawberry(){
        var panelElem = document.querySelector(".strawberry-panel");
        if(panelElem.classList.contains("panelBorder")){
          panelElem.classList.remove("panelBorder");
        }        
        var timeSpent = (new Date().getTime()- startTime)/1000;
        console.log("time spent on Strawberry: " + timeSpent + "s");        
      }      

      function mounseOnPineapple(){
        startTime = new Date().getTime();
        var panelElem = document.querySelector(".pineapple-panel");
        panelElem.classList.add("panelBorder");
      }                              

      function mounseOutOnPineapple(){
        var panelElem = document.querySelector(".pineapple-panel");
        if(panelElem.classList.contains("panelBorder")){
          panelElem.classList.remove("panelBorder");
        }        
        var timeSpent = (new Date().getTime()- startTime)/1000;
        console.log("time spent on Pineapple: " + timeSpent + "s");        
      }      


      // This function following tasks
      // 1. If vegetable is selected in the dropdown, it will hide all fruits 
      // 2. If fruit is selected in the dropdown, it will hide all vegetables 
      // If both(by default behaviour), display all fruits as well as vegetables
      function filterContentDropDown(){
        //Get the value of select option
        var filter = document.querySelector('.filter-type').value;

        // If the user is interested in fruits only
        if(filter == "Fruits"){

          var f = document.getElementsByClassName("fruit");
          if(f[0].style.display == 'none'){
            for(let i = 0; i<f.length; i++){
              f[i].style.display = 'inline-block';
            }
          }

          var v = document.getElementsByClassName("vegetable");
          for(let i = 0; i<v.length; i++){
            v[i].style.display = "none";
          }
        }
        // If the user is interested in vegetables only
        else if(filter == "Vegetables"){

          var v = document.getElementsByClassName("vegetable");
          if(v[0].style.display == 'none'){
            for(let i = 0; i<v.length; i++){
              v[i].style.display = "inline-block";
            }
          }

          var f = document.getElementsByClassName("fruit");
          for(let i = 0; i<f.length; i++){
            f[i].style.display = 'none';
          }
        }
        // If the user hasn't applied any filter or wants to see both
        else if(filter == "Both"){
          var v = document.getElementsByClassName("vegetable");
          if(v[0].style.display == 'none'){
            for(let i = 0; i<v.length; i++){
              v[i].style.display = "inline-block";
            }  
          }

          var f = document.getElementsByClassName("fruit");
          if(f[0].style.display == 'none'){
            for(let i = 0; i<f.length; i++){
              f[i].style.display = 'inline-block';
            }   
          }             
        }
      } // filterContent ends


      function saveSearch(){
        let searchedItem = document.querySelector(".search-item").value;
        console.log("searched for: "+searchedItem);
        alert("searched for: "+searchedItem);
        // let itemSet = localStorage.getItem("searchItems");
        let itemSet = sessionStorage.getItem("searchItems");
        alert(itemSet);
        itemSet.push(searchedItem);
        alert(itemSet.length);
      }

      function mySearchFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        var parent = document.getElementsByClassName("panel-heading");
        for (i = 0; i < parent.length; i++) {
            txtValue = parent[i].textContent || parent[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                parent[i].parentElement.parentElement.style.display = "";
            }else{
                parent[i].parentElement.parentElement.style.display = "none";
            }
        }
      }