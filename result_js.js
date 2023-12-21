var showRulesBtn = document.querySelector('.rulebutton');
var gameRules = document.querySelector('.rules-page');
var exitBtn = document.getElementById('exit');

showRulesBtn.addEventListener('click', function () {
  // Toggle the visibility of the rules
  gameRules.classList.toggle("open")

});
exitBtn.addEventListener('click', function () {
  // Toggle the visibility of the rules
  gameRules.classList.toggle("open")

})