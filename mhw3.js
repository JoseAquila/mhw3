//form 1
function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function onError(error) {
  console.log('Error: ' + error);
}

function onJsonCampionati(json) {
  console.log('JSON campionati ricevuto');
  console.log(json);
  
  const view = document.querySelector('#viewCampionati');
  view.innerHTML = '';

  if(json.data.length === 0){
    console.log('Errore!!');
  }

  const containerCampionato = document.createElement('div');
	containerCampionato.classList.add('divCampionati');
  
  const nomeCampionato = document.createElement('h2');
  nomeCampionato.classList.add('nomeCampionato');
	nomeCampionato.textContent = json.data.name;
	containerCampionato.appendChild(nomeCampionato);

  const classifica = json.data.standings; 
  const righe = document.createElement('div');
  containerCampionato.appendChild(righe);
  let cont=0;
  for(let i of classifica){
    cont++;
    const rigaIesima = document.createElement('h5');
    rigaIesima.textContent = cont+' .  '+ ' Squadra:  '+i.team.name+  '  punti= '+ i.stats[6].value;
    righe.appendChild(rigaIesima);
  }
  view.appendChild(containerCampionato);
}


function selezionaCampionato(event){
	event.preventDefault();
  const tipo = document.querySelector('#tipo').value;
  const stagione = document.querySelector('#stagione').value;
  const url_campionati = 'https://api-football-standings.azharimm.site/leagues/'+tipo+'/standings?season='+stagione+'&sort=asc'
  fetch(url_campionati).then(onResponse,onError).then(onJsonCampionati);
}

const formCampionato = document.querySelector('#formCampionati');
formCampionato.addEventListener('submit', selezionaCampionato);

//form 2
function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  
  const view = document.querySelector('#viewSpotify');
  view.innerHTML = '';
  
  const div = document.createElement('div');
  div.classList.add('divSpotify');
  const titolo = document.createElement('p');
  titolo.classList.add('titoloCanzone');
  titolo.textContent = json.tracks.items[0].name;
  const img = document.createElement('img');
  img.src = json.tracks.items[0].album.images[1].url;
  const sound = document.createElement('a');
  sound.textContent = 'clicca qui per ascoltare';
  sound.href = json.tracks.items[0].preview_url;
  
  view.appendChild(div);
  div.appendChild(titolo);
  div.appendChild(img);
  div.appendChild(sound);
  
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}
function onError(error) {
  console.log('Error: ' + error);
}
function search(event){
  event.preventDefault();

  const input = document.querySelector('#traccia');
  const input_value = encodeURIComponent(input.value);
  console.log('Eseguo ricerca: ' + input_value);
  
  fetch("https://api.spotify.com/v1/search?q="+ input_value +"&type=track",
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse,onError).then(onJson);
}

function onTokenJson(json){
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response){
  return response.json();
}

const client_id='4ba9e1d59b8f4ee99f8eacf5c4384554';
const client_secret='06794192c7f0439e92507c539b9a84d1';
let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const formSpotify = document.querySelector('#formSpotify');
formSpotify.addEventListener('submit', search);