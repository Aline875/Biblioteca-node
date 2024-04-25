import fs from 'fs';
import chalk from 'chalk';



function extraiLinks(texto)
{
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultado = capturas.map(captura => 
        ({
           [ captura[1]]: captura [2]
        }))
        return resultado.length !== 0 ? resultado: 'não há links nesse arquivo';
}

function trataErro(erro)
{
    console.log(erro)
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretorio'));
}

//async/await
async function pegarAqruivo(caminhoArquivo)
{
    try 
    {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
         return extraiLinks(texto);
    }
    catch (erro)
    {
        trataErro(erro)
    }
}

export default pegarAqruivo;