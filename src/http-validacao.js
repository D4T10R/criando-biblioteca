import chalk from "chalk"

function extraiLink(arrLinks) {
    return arrLinks.map(link => Object.values(link).join())    
}

async function checaStatus(listaURLs) {
    const arrayStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (err) {
                return manejaErros(err)
            }
        })
    )
    return arrayStatus 
}

function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'LINK NÃO ENCONTRADO'
    } else {
        return 'OCORREU ALGUM ERRO'
    }
}

async function listaValidada(listaLinks) {
    const links = extraiLink(listaLinks)
    const status = await checaStatus(links)
    return listaLinks.map((links, indici) => ({
        ...links, 
        status: status[indici]
    }))
}


export default listaValidada