import chalk from "chalk";
import fs from 'fs';
import pegarAqruivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida ,resultado, identificador = '')
{
    if(valida)
    {
        console.log(
            chalk.green('Lista validada'),
            chalk.black.bgGreen(identificador), await listaValidada(resultado)); 
    }
    else
    {
        
            console.log(
                chalk.yellow('Lista de links'),
                chalk.black.bgGreen(identificador),resultado);
    }
}

async function processaTexto (argumentos)
{
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
     
      try
    {
        fs.lstatSync(caminho);
    } catch (erro) 
    {
        if(erro.code === 'ENOENT')
        console.log(chalk.red('Arquivo ou diretorio não existe.'));
        return;
    }

    if (fs.lstatSync(caminho).isFile())
    {
        const resultado = await pegarAqruivo(caminho);
        imprimeLista(valida, resultado);
    }
    else if (fs.lstatSync(caminho).isDirectory)
    {
        const arquivo = await fs.promises.readdir(caminho);
        arquivo.forEach (async (nomeDeArquivo) => 
        {
            const lista  = await pegarAqruivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo);
        })
    }

}

processaTexto(caminho);