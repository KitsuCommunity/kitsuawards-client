<template>
    <div class="title-wrapper">
      <h1 class="error-title">OH SNAP!</h1>
      <h3 class="error-subtitle">IT LOOKS LIKE SOMETHING <br id="break">WENT WRONG...OUR BAD</h3>
      <div class="text-wrapper">
        <p class="error-text">People are imperfect and apparently so are our servers, we apologise for the downtime.</p>
        <p class="error-text">In the in the meantime, maybe try <strong>refreshing your browser</strong> or if that doesn't work, watch all episodes of One Piece and <strong>try again later.</strong></p>
      </div>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,900');
@import url('https://fonts.googleapis.com/css?family=Raleway:900');

  html {
    height: 100vh !important;
  }

  body {
    min-height: 100vh !important;
    font-family: "lato", helvetica, Arial, sans-serif;
    text-align: center;
    color: #fff;
  }
    
  .title-wrapper {
    background-color:;
    position: absolute;
    width: 1500px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  
  .error-mobile {
    /* h2 */
    padding-top: 60px;
    padding-bottom: 15px;
    line-height: 0em;
  }
  h2 {
    font-size:15vw;
    color: rgba(255,255,255,0.1);
    line-height: 1em;
  }
  
  .error-title {
    /* h1 */
    line-height: 0em;
  }
  h1 {
    font-family: "raleway", helvetica, Arial, sans-serif;
    font-size: 140pt;
    font-weight: 900;
    margin: .67em 0 !important;
  }
  
  
  .error-subtitle {
    /* h3 */
    margin-top: -20px;
    line-height: 1em;
  }
  h3 {
    font-size:30pt;
    font-weight: 300;
    text-align: center;
  }
  
  .text-wrapper {
    padding-top:50px;
  }
  
  .error-text {
    /* p */
    max-width: 80vw;
    margin-left: auto;
    margin-right: auto;
    
  }
  p {
    font-size: 20pt;
    font-wight: 400;
  }
  
  #break {
    display:none;
  }


  
@media screen and (min-width: 2500px) {
  .error-title {
     font-size: 180px;
  }
}
  
@media screen and (min-width: 1101px) {
  .error-mobile {
     display:none;
  }
}  

@media screen and (min-width: 0px) and (max-width: 1100px) {
  .error-mobile {
    display:block;
  }
  
  .error-title {
     font-size: 16vw;
  }
  
  .error-subtitle {
    padding-top:10px;
    font-size:5vw;
  }
  
  .error-text {
    font-size:16pt;
  }
    
  #break {
    display:block;
  }
} 
</style>