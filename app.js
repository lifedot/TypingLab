let upperkeyboard = $('#keyboard-upper-container');
let lowerkeyboard = $('#keyboard-lower-container');
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 
'Too ato too nOt enot one totA not anot tOO aNot', 
'oat itain oat tain nate eate tea anne inant nean', 
'itant eate anot eat nato inate eat anot tain eat', 
'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let letterIndex = 0;
let sentenceIndex = 0;
let sentenceDisplay = $('#sentence');
let feedBack = $('#feedback');
let targetLetter = $('#target-letter');
let yellowBlock = $('#yellow-block');
let highlighterPosition = 15;
let mistakectr = 0;
let ctr = 0;
let startTime;



upperkeyboard.hide();
sentenceDisplay.append(sentences[sentenceIndex]);

function gameStart(e) {
    let startTime= e.timeStamp;
}

function gameOver(e) {
    $(document);
    let endTime = e.timeStamp;
    let msTime = endTime - startTime;
    let sTime = msTime / 1000;
    let minTime = sTime / 60;
    let wpm = 54 / minTime - 2 * mistakectr;
    let end = $(`<h2>You typed ${wpm} words per minute!</h2>`);
    
    sentenceDisplay.append(end);
}


$(document).keydown(function(e){
    if(e.shiftKey) {
        lowerkeyboard.hide();
        upperkeyboard.show();
    } else {
        ctr++;
        console.log(ctr);
        
    }
    if (ctr === 1){
        gameStart(e);
    }
    if (e.key === sentences[sentenceIndex][letterIndex]){

        letterIndex++;
        highlighterPosition = highlighterPosition + 17.5;
        targetLetter.empty();
        targetLetter.append(sentences[sentenceIndex][letterIndex]);
        feedBack.empty();
        feedBack.append('<i class="glyphicon glyphicon-ok"></i>')
        yellowBlock.css('margin-left', `${highlighterPosition}px`);

        if (sentences[sentenceIndex][letterIndex] === ' ') {
            targetLetter.empty();
            targetLetter.append('Space')
        }
    }   else {
        feedBack.empty();
        feedBack.append('<i class="glyphicon glyphicon-remove"></i>');
        mistakectr++;
        
    }
    

});

$(document).keypress(function(e){
    $(`#${e.which}`).css('background-color', 'yellow');

});

$(document).keyup(function(e){
    let asciicode = e.key.charCodeAt(0);

    if (e.which == 16) {
        lowerkeyboard.show();
        upperkeyboard.hide();
    }
    if(sentenceIndex < sentences.length){
        if (sentenceIndex === sentences[sentenceIndex].length){
        sentenceIndex++;
        letterIndex = 0;
        highlighterPosition = 15;
        targetLetter.empty();

        sentenceDisplay.empty();
        sentenceDisplay.append(sentences[sentenceIndex]);
        }

 } else if (sentenceIndex >= sentences.length) {
    gameOver(e);
 }


    $(`#${asciicode}`).css('background-color', '#f5f5f5');
});

