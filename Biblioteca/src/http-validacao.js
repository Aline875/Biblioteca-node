import chalk from "chalk";
function extraiLinks(arrlinks) 
{
  return arrlinks.map((ObjectoLink) => Object.values(ObjectoLink).join()) 
}

async function checaStatus (listaUrls) 
{
  const arrayStatus = await Promise.all(
    listaUrls.map(async(url) => 
    {
      try {
        const response = await fetch (url)
        return response.status;
      } catch (erro) {
        return manejaErros(erro);
      }
    })  
  )
  return arrayStatus
}
  
function manejaErros(erro) 
{
  if (erro.cause.code === 'ENOTFOUND') 
  {
    return 'link não encontrado.'
  } 
  else
  {
    return 'ocorreu algum erro'
  }
}
 export default async function listaValidada(listaDeLinks)
    {
      const links = extraiLinks(listaDeLinks);
      const status = await checaStatus(links);
      return listaDeLinks.map((objeto, indice)=> (
        {
          ...objeto, status: status[indice]
        }));
    }