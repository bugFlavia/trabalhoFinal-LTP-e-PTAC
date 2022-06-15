let jsonURL = "https://www.luizpicolo.com.br/api.json"; 
let XHR = new XMLHttpRequest();
XHR.open("GET", jsonURL);
XHR.responseType = "json";
XHR.send();

XHR.onload = function(){

	let noticias = XHR.response;

  class erroCustom extends Error{
    constructor(nome, mensagem){
      super(mensagem)
      this.nome = nome
    }
     mensagem(){
      let mensagem = this.stack("");
      return this.nome + this.mensagem
     }
  }
  
  class Noticia {
  constructor(name, data_publicacao, link, titulo, autor){
		this.name = name;
		this.link = link
    this.titulo = titulo;
    this.data_publicacao = data_publicacao;
    this.autor = autor;
  }

  mostrarNoticia(){
    if(this.name == 0 || this.data_publicacao == 0 || this.link == 0 || this.titulo == 0 || this.autor == 0){
      throw new erroCustom("Algum dos atributos não pode ser encontrado")
    }
    else{
      return `<div class="geral">
      <div class="noticiaSpam">
      <div class="divisaoNoticia">
      <h5>${this.name}</h5>
      <h5>${this.data_publicacao} </h5>
      </div>
      <a href="${this.link}"><h2 id="textoPrincipal">${this.titulo}</h2></a> 
      <h5> ${this.autor}</h5>
      </div>
      </div>
`;
    }
  
  }

  erro(){
         try{
             return this.mostrarNoticia();
         }catch(error){
                        return error.mensagem();
         }
  }

}

	class NoticiaDestaque extends Noticia{
	constructor(imagem, data_publicacao, link, titulo, autor, resumo){
		super(imagem, data_publicacao, link, titulo, autor, resumo)

		    this.imagem = imagem;
        this.resumo = resumo;
	}

	mostrarDestaque(){
		return `<div class="geralDestaque">
            <div class="spamDestaque">
        <div class="destaqueImagem">
        <img src="${this.imagem}" id="principal"/>
        </div>
        <div class="elementosDestaque">
        <h4>${this.data_publicacao} </h5>
        <a href="${this.link}"><h2 id="textoPrincipal">${this.titulo}</h2></a> 
        <h4> ${this.autor}</h5>
        <p> ${this.resumo}</h5>
        </div>
        </div>
        </div>
`;
	}

}
	
  const local = document.getElementById('localNoticia');

  let noticiaDestaque = new NoticiaDestaque(
                                            noticias.articles[0].urlToImage,
                                            noticias.articles[0].publishedAt,
                                            noticias.articles[0].url,
                                            noticias.articles[0].title,
                                            noticias.articles[0].author,
                                            noticias.articles[0].description);

  local.insertAdjacentHTML('afterbegin',noticiaDestaque.mostrarDestaque());

  console.log(noticiaDestaque);
	
  noticias.articles.forEach(noticia =>{
    let noticiaNova = new Noticia(noticia.source.name, noticia.publishedAt, noticia.url, noticia.title, noticia.author);
    local.insertAdjacentHTML('beforeend', noticiaNova.mostrarNoticia() );
  })
  console.log(noticia.erro())
};