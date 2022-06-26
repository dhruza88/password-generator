var length;
var availableChar ="";
const msgs = {
  selCancel: 'Do you want to cancel generating a password',
  youCanceled: 'You Canceled the Generator',
  oneCharSel: 'Sorry! You need to make at least one character selection!',
  accLeng: 'Choose a length of at least 8 characters and no more than 128 characters',
  improperLeng: 'Sorry your entry was outside the length parameter! Please retry.',
  inclLower: 'Do you want to include lower case',
  inclUpper: 'Do you want to include upper case',
  inclNumFig: 'Do you want to include numeric figures',
  inclSpecChar: 'Do you want to include special characters'
}

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  setTimeout(() => {
    var passwordText = document.querySelector("#password");
    passwordText.classList.remove('passError');
    passwordText.value = 'Your Secure Password';

    setTimeout(() => {
      var password = generatePassword();                                //to allow for change back from red on cancel, to allow style changes before prompting
      if (password && password.includes('Canceled')) {
        passwordText.classList.add('passError');
      }
      passwordText.value = password;
    });
  });
}


function generatePassword(){
  var password = "";
  var parameters = getParameters();
  if (!parameters) {
    return msgs.youCanceled;
  }
  if (falseParameters(parameters)) {
    alert(msgs.oneCharSel);                                                         //make sure correct length 
    let cancel = confirm(msgs.selCancel);                                           //cancels out if selected
    if (!cancel) {
      generatePassword();
    } else {
      return;
    }
  }

  for(i=0; i<parameters.length; i++) {                                              //for loop to generate password
    password =
      password.length > 0 ?                                                         //ensures that the password is of right length and creates it based on provided variables
      password + getSelectedCharacter(parameters) :
      getSelectedCharacter(parameters);
  }
  return password;
}

function getSelectedCharacter(parameters) {
  const characterArrays = [];
  const alphaTrue = parameters.lower || parameters.upper;
  if (alphaTrue) {
    characterArrays.push([...'abcdefghijklmnopqrstuvwxyz']);                  //pushing alphabet
  }
  if (parameters.specChar) {                                                  //pushing characters
    characterArrays.push([...'~!@#$%^&*()_-+={[}]|\:;<,>.?/']);
  }
  if (parameters.numFig) {                                                    //pushing numbers
    characterArrays.push([...'0123456789']);
  }

  const randomDigit = Number(Math.floor(Math.random() * characterArrays.length));       //randomly picking type of variable that were selected
  const selectedArray = characterArrays[randomDigit];

  const randomDigitSelection = Number(Math.floor(Math.random() * selectedArray.length));
  let selectedCharacter = selectedArray[randomDigitSelection].toString();

  if (alphaTrue && randomDigit === 0) {                                               //if either type lower or upper is selected
    const upperLowerChar = [];
    if (parameters.lower) {
      upperLowerChar.push(
        selectedCharacter.toLowerCase()                                               //push lower case alphabet
      )
    }
    if (parameters.upper) {
      upperLowerChar.push(
        selectedCharacter.toUpperCase()                                              //push upper case alphabet
      )
    }
    const randomCase = Number(Math.floor(Math.random() * upperLowerChar.length));
    selectedCharacter = upperLowerChar[randomCase];                                 //picks between the upperLower Array based on what is available
  }
  return selectedCharacter;
}

function falseParameters(params) {                                                   //if no type is selected, being told to start over again, selecting atleast 1
  return (
    !params.lower &&
    !params.upper &&
    !params.numFig &&
    !params.specChar
  );
}

function getParameters() {
  const leng = Number(prompt(msgs.accLeng));    //prompting for password length between 8 and 128
  if (!leng || leng === 0) {
    return null;
  }
  if (leng < 8 || leng > 128) {
    alert(msgs.improperLeng);                        //prompting you to retry cause you entered invalid data
    generatePassword();
  } else {
    return {
      length: leng,
      lower: confirm(msgs.inclLower),
      upper: confirm(msgs.inclUpper),
      numFig: confirm(msgs.inclNumFig),
      specChar: confirm(msgs.inclSpecChar),
    };
  }
}

