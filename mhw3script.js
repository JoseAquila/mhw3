function restart(){
  const risultato=document.querySelector('#risultato');
  risultato.classList.add("hidden");
  for(const box of listaContenitori){
        box.classList.remove('seleziona');
        box.classList.remove("oscura");
        const checkbox = box.querySelector('.checkbox');
        checkbox.src="images/unchecked.png";
        box.addEventListener('click', selezionaImmagine);
    }
    var1=var2=var3=undefined;
}

function result(index){
    const risultato=document.querySelector('#risultato');
    risultato.classList.remove('hidden');

    const titolo=document.querySelector('footer h1')
    titolo.textContent=RESULTS_MAP[index].title;

    const paragrafo=document.querySelector('footer p');
    paragrafo.textContent=RESULTS_MAP[index].contents;

    const button=document.querySelector('footer div')
    button.addEventListener('click',restart);
}

let var1,var2,var3;
function personality(questionId,choiceId){
  
  let index;
  if (questionId === "one")
      var1 = choiceId;
  else if (questionId === "two")
      var2 = choiceId;
  else 
      var3 = choiceId;
  if(var1!== undefined && var2!== undefined && var3!== undefined){
    for (const box of listaContenitori)
        box.removeEventListener("click",selezionaImmagine);
    if(var1 === var2 || var1 === var3)
        index = var1;
    else if (var2 === var3)
        index = var2;
    else 
        index = var1;
    result(index);
  }
}

function selezionaImmagine(event){

  const selezionato = event.currentTarget;
  const selezionati=[];
  const nonSelezionati=[];

  selezionati.push(selezionato);
  for(const box of listaContenitori){
    nonSelezionati.push(box);
  }
  const indexToRemove= nonSelezionati.indexOf(selezionato);
  nonSelezionati.splice(indexToRemove,1);

  for (const box of selezionati){
    box.classList.add('seleziona');
    const checkbox = box.querySelector('.checkbox');
    checkbox.src="images/checked.png";
    box.classList.remove('oscura');
  }

  for (const box of nonSelezionati){
    if(box.dataset.questionId===selezionato.dataset.questionId){
      box.classList.add("oscura");
      const checkbox = box.querySelector('.checkbox');
      checkbox.src="images/unchecked.png";
      box.classList.remove('seleziona');
      }
  }
  personality( selezionato.dataset.questionId, selezionato.dataset.choiceId );
}

const listaContenitori = document.querySelectorAll("section div");
for (const box of listaContenitori){
  box.addEventListener("click",selezionaImmagine);
}



function scelta(event){

  const home = document.querySelector('#home');
  home.classList.add('hidden');

  const selezione = event.currentTarget;

  const containerCampionato = document.querySelector('#containerCampionato');
  const quiz = document.querySelector('#quiz');
  const containerSpotify = document.querySelector('#spotify');
  
  if (selezione.textContent === 'Quiz'){
    quiz.classList.remove('hidden');
    containerCampionato.classList.add('hidden');
    containerSpotify.classList.add('hidden');
  } else if (selezione.textContent === 'Campionati'){
      containerCampionato.classList.remove('hidden');
      quiz.classList.add('hidden');
      containerSpotify.classList.add('hidden');

  } else if (selezione.textContent === 'Ascolta'){
      containerCampionato.classList.add('hidden');
      quiz.classList.add('hidden');
      containerSpotify.classList.remove('hidden');
  } else if (selezione.textContent === 'Home'){
    containerCampionato.classList.add('hidden');
    quiz.classList.add('hidden');
    containerSpotify.classList.add('hidden');
    home.classList.remove('hidden');
  }

}

const spans = document.querySelectorAll('header div span');
for(const span of spans){
  span.addEventListener('click',scelta);
}