let $=document;
let UserInput=$.querySelector('.UserInput')
let translate_btn=$.querySelector('.search')
let add_items_in_it=$.querySelector('.zarf_button')
let Audio_word= $.querySelector('.sound_word')
let tags_P_append= $.querySelector('.appended_word')
let btn_sound=$.querySelector('.play_sound')

function fetch_get_item(){
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${UserInput.value}`)
    .then(item=>item.json())
    .then(data=>SetData(data))
}


function SetData(item){

    tags_P_append.innerHTML='';

    $.querySelector('.items_word').innerHTML='';
    $.querySelector('.items_pronunciation').innerHTML='';


    let number_of_meaning=1;
    let number_of_state=1;

    // get audio src
    let get_src=[...item[0].phonetics]
    let audio_src=get_src[0].audio
    if(!audio_src){
        audio_src=get_src[1].audio
    }


    // get word state
    let word_state=item[0].meanings
    

// get word meaning
   let get_word_meaning=[...item[0].meanings]
   word_mean=[...get_word_meaning[0].definitions].slice(0,5)

  

    $.querySelector('.items_word').innerHTML=item[0].word
    $.querySelector('.items_pronunciation').innerHTML=item[0].phonetic;

   Audio_word.setAttribute('src',audio_src)
   play_sound_word()
// console.log(item)


    let div_word=$.createElement('div')
    div_word.setAttribute('class','border_button')
    tags_P_append.append(div_word)

    word_state.forEach(item=>{
    let tap_P=$.createElement('p');
    tap_P.setAttribute('class','zarf_detail')
    tap_P.innerHTML=`${number_of_state}:${item.partOfSpeech}`
    div_word.append(tap_P)

    number_of_state++;
  })
    word_mean.forEach(item=>{
    let tap_P=$.createElement('p');
    tap_P.setAttribute('class','zarf_detail')
    tap_P.innerHTML=`${number_of_meaning}:${item.definition}`
    tags_P_append.append(tap_P)


    number_of_meaning++;
  })

}



function play_sound_word(){
    Audio_word.play();
}


$.body.addEventListener('keydown',(e)=>{
    if(e.keyCode==13){
        fetch_get_item()
    }})


translate_btn.addEventListener('click',()=>{fetch_get_item()})



btn_sound.addEventListener('click', play_sound_word)
