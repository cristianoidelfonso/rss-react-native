import createDataContext from './createDataContext';
import { XMLParser } from 'fast-xml-parser';
import rssfeed from '../api/rssfeed';

import AsyncStorage from '@react-native-async-storage/async-storage';


// const saveFeeds = async (feeds) => {
//     try {
//         await AsyncStorage.setItem('feeds', JSON.stringify(posts))
//     } catch (error) {
//         console.log(error);
//     }
// }

// const clearStorage = async () => {
//     try {
//         // await AsyncStorage.clear();
//         await AsyncStorage.removeItem('feeds');
//         alert('Limpou feeds salvos');
//     } catch (error) {
//         console.log(error);
//         alert('Falha ao limpar feeds');
//     }
// }

const feedReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'fetch_items':
            //console.log('implementar fetch_items');
            newState = action.payload;
            //console.log('newState', newState);
            return newState;
        case 'add_item':
            console.log('implementar');
            return state;
        case 'delete_item':
            console.log('implementar');
            return state;
        case 'restore_state':
            console.log('implementar');
            return state;
        case 'delete_all':
            console.log('implementar');
            return state;
        default:
            return state;
    }
};

const addItem = dispatch => {
    return (titulo, urlFeed, callback) => {
        console.log('implementar');
    };
};

const deleteItem = dispatch => {
    return (id) => {
        console.log('implementar');
    };
};

const fetchItems = dispatch => async (feedURL) => {
    //console.log('fetchItems - FeedContext', feedURL);
    const parser = new XMLParser();
    const fetch = rssfeed(feedURL);
    const response = await fetch.get();
    const data = response.data;
    let feed = await parser.parse(response.data);
    
    //mode no-cors do fetch não permite a leitura da resposta
    //fetch(feedURL, {mode: 'no-cors'}).then(res => res.json()).then(res => console.log(res));

    //console.log(feed.rss.channel.language);//linguagem do RSS feed
    //console.log(feed.rss.channel.title);//linguagem do RSS feed
    //console.log(feed.rss.channel.description);//linguagem do RSS feed
    //console.log(feed.rss.channel.item);//todos os itens do feed - notícias
    
    //console.log(feed.rss.channel.item[0].title);//todos os itens do feed - notícias

    let items = feed.rss.channel.item;
    
    // items.forEach((currentValue, index) => {
    //     console.log('Foreach', currentValue.title, index)
    // });
    
    const retornoMap = await items.map((itemAtual, i) => {
        return {
            title: itemAtual.title,
            pubDate: itemAtual.pubDate,
            description: itemAtual.description,
            //image: image,
            link: itemAtual.link,
        }
    });
    // console.log(retornoMap);

    if (!retornoMap) {
        console.log('nada foi salvo ainda...');
    }
    else { 
        dispatch({type:'fetch_items', payload: retornoMap});
    }

    //console.log('implementar');
};

const restoreState = dispatch => async () => {
    return () => {
        console.log('implementar');
    }
}


const deleteAll = dispatch => {
    return () => {
        console.log('implementar');
    }
}

const rssItems = [
    {
        titulo: 'Atleta patrocinado pela Unimed Teresina é campeão do Picos Pro Race',
        link: 'https://g1.globo.com/pi/piaui/especial-publicitario/unimed-teresina/sos-unimed/noticia/2023/04/25/atleta-patrocinado-pela-unimed-teresina-e-campeao-do-picos-pro-race.ghtml',
        descricao: 'Com a conquista o ciclista segue na liderança do campeonato piauiense de XCO. Lindomar Ferreira, atleta patrocinado pela Unimed Teresina, conquistou mais um título neste final de semana. O ciclista foi campeão do Picos Pro Race Series Short Track. A etapa da 11ª edição da competição aconteceu no Complexo Ponte Estaiada no último sábado (22). Lindomar Ferreira atleta patrocinado Unimed Teresina Ascom/Unimed Teresina O atleta foi 1º lugar na categoria Master B2 e dispara na liderança do campeonato piauiense. “A competição marcou a 3ª etapa do campeonato. A 1ª etapa aconteceu no Parque da Cidade, a 2ª foi em Hugo Napoleão. Com isso sigo na liderança do campeonato em XCO. Foi uma prova de circuito, muito técnica e de velocidade, uma prova de tempo de 40min e mais uma volta”, destaca Lindomar Ferreira. A competição faz parte do calendário oficial da Federal de Ciclismo do Piauí e conta pontos para o ranking estadual de XCO. Picos Pro Race é a maior prova de MTB do Piauí. Em 2023 chegou a sua 11ª Edição fomentando o esporte, desenvolvendo o turismo e gerando renda numa das regiões mais importantes do Piauí.',
        imagem: 'https://s2.glbimg.com/iZkK7HVJP3rvLR1gqgzW2DNX1-0=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/s/3/eN7iiETci8W4AJXW34zQ/lindomar-ferreira-atleta-patrocinado-unimed-teresina.-foto-ascom-2-.jpeg',
        dataPublicacao: 'Tue, 25 Apr 2023 13:43:54 -0000'
    },
    {
        titulo: 'Ocupação de UTIs para adultos com Covid-19 em hospitais públicos de Fortaleza é a maior desde o início da pandemia',
        link: 'https://g1.globo.com/ce/ceara/noticia/2021/04/07/ocupacao-de-utis-para-adultos-com-covid-19-em-hospitais-publicos-de-fortaleza-e-a-maior-desde-o-inicio-da-pandemia.ghtml',
        descricao: 'Dados desta quarta-feira (7) apontam que lotação chegou a 98%; UTIs infantis também estão próximas do colapso. O Hospital Leonardo da Vinci, referência no tratamento da doença, só tem três leitos disponíveis nesta manhã.',
        imagem: 'https://s2.glbimg.com/EpWPtt_HC_n9YkyaSSRckR7SFKI=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/0/D/fZhc3UTdu4gHsXv9SC5A/pho20200524032.jpg',
        dataPublicacao: 'Wed, 07 Apr 2021 12:19:41 -0000'
    },
    {
        titulo: 'Grupo empresarial deve pagar quase R$ 21 milhões por desvio de recursos da Cidade das Águas em Frutal',
        link: 'https://g1.globo.com/mg/triangulo-mineiro/noticia/2020/02/14/grupo-empresarial-deve-pagar-quase-r-21-milhoes-por-desvio-de-recursos-da-cidade-das-aguas-em-frutal.ghtml',
        descricao: 'Empresa foi investigada pelo MPMG em 2016 quando empresários e políticos foram presos. Parte do acordo será destinada à UEMG e restante vai para o Estado; G1 procurou os envolvidos. Parcela de R$ 10,2 milhões será destinada ao custeio de projetos da Universidade Estadual de Minas Gerais (UEMG), de Frutal Ascom/Unesco-Hidroex Um grupo empresarial português firmou acordo para pagamento de R$ 20,9 milhões em medidas compensatórias apuradas pela Operação “Aequelis”, que investiga o desvio de recursos públicos destinados a Fundação Centro Internacional de Educação, Capacitação e Pesquisa Aplicada em Águas (Hidroex) para a construção do Complexo Cidade das Águas, em Frutal. O acordo foi firmado com o Ministério Público de Minas Gerais (MPMG), Controladoria-Geral do Estado (CGE-MG) e a Advocacia-Geral do Estado (AGE). A informação foi divulgada pelo MPMG na última segunda-feira (10). Os valores já foram depositados. O nome do grupo empresarial não foi divulgado na publicação do órgão, que reforçou que não fornece contatos de partes em procedimentos. Na época da operação, desencadeada em 2016, empresários e políticos foram conduzidos pela polícia durante cumprimento de mandados de prisão em cidades no interior de Minas Gerais e São Paulo. Foram encontrados indícios de superfaturamento em vários contratos (relembre mais abaixo). Segundo o MPMG, R$ 4,7 milhões são referentes ao ressarcimento do dano causado ao Estado. Outros R$ 10,2 milhões se referem a danos morais coletivos. No acordo, constam, ainda, R$ 4,7 milhões como pagamento de multa civil, e R$ 1,2 milhão de transferência não onerosa. “Sem abrir a mão da punição àqueles que cometeram os ilícitos, a solução leva benefícios imediatos aos que foram prejudicados pelos crimes. Esse é um ponto em que insistimos desde o início e que continuaremos a reforçar”, disse o procurador-geral de Justiça de Minas Gerais, Antônio Sérgio Tonet. Destinação Uma parcela de R$ 10,2 milhões será destinada ao custeio de projetos da Universidade Estadual de Minas Gerais (UEMG), de Frutal. Já o restante será destinado aos cofres do Estado. Conforme o Ministério Público, o acordo firmado se refere a uma das ações ajuizadas por improbidade administrativa, e interfere em outras ações penais em curso na Justiça Federal. Réus que ainda não firmaram acordo continuam respondendo o processo. A Fundação Hidroex foi extinta em 2016. Promotoria de Frutal O G1 entrou em contato com o MPMG para saber qual a quantia de dinheiro público desviada e se, além do impacto financeiro, houve impacto ambiental. Sobre isso, a Promotoria de Justiça de Defesa do Patrimônio Público de Frutal informou, nesta quinta-feira (13), que o valor estimado de dinheiro público desviado segundo a apuração do Ministério Público foi de R$ 4.758.136,00. Sobre os danos gerados ao Estado – citados no acordo – a promotoria afirmou que não têm qualquer aspecto ambiental, sendo exclusivamente no âmbito da tutela do patrimônio público. Valores depositados Foi informado também que os valores do acordo foram depositados em conta judicial nos autos da ação, em trâmite pela 2ª Vara Cível da Comarca de Frutal e serão gastos nos termos de acordo com solicitação específica e autorização judicial. UEMG Ainda segundo a promotoria, em relação ao montante destinado à UEMG Frutal, relativos aos danos morais coletivos, foi designada pela 3ª Promotoria de Justiça de Frutal uma reunião na próxima segunda-feira (17) com a Diretoria da unidade e com a Comissão pró-UEMG Frutal. O encontro vai contar com representantes dos estudantes, dos professores, dos servidores e da sociedade civil frutalense para discutir as prioridades a serem atendidas e como ocorrerá a fiscalização por parte do MPMG, que encaminhará também para análise da CGE. Operação "Aequalis" A Operação "Aequalis" foi deflagrada em maio de 2016. No dia 20 de setembro do mesmo ano, o governador de Minas Gerais, Fernando Pimentel, sancionou a lei que extinguiu a Fundação Hidroex, investigada pelo MPMG por suspeita de envolvimento e desvio de verbas públicas. A operação encontrou indícios de superfaturamento em vários contratos, dentre eles o de venda de equipamentos. O ex-secretário de Estado de Ciência, Tecnologia e Ensino Superior de Minas Gerais, entre 2012 e 2014, Nárcio Rodrigues (PSDB), e outras 14 pessoas foram acusadas de organização criminosa, fraude em licitação, obtenção de vantagem indevida, lavagem de dinheiro, peculato e obstrução. Cidade das Águas foi projeto para ser um centro internacional de pesquisa Ascom/Unesco-Hidroex A Hidroex desenvolvia em Frutal o Complexo Cidade das Águas, que começou a ser construído em 2012 e teria mais de 1 milhão de m². O local foi projetado para se tornar um centro internacional de pesquisa, com foco na conservação do patrimônio hidrológico da América Latina e das nações africanas de língua portuguesa. Com a extinção da Hidroex, a Universidade Estadual de Minas Gerais (UEMG) assumiu as responsabilidades e obrigações da fundação quanto aos programas, projetos, contratos e convênios celebrados. O mesmo ocorreu com os bens imóveis, que foram revertidos ao patrimônio do Estado, cabendo à Secretaria de Fazenda (SEF) proceder a destinação. Irregularidades na Hidroex Uma auditoria da Controladoria-Geral de Minas Gerais apontou, em abril de 2016, suposto dano aos cofres públicos devido a irregularidades na obra do Complexo Cidade das Águas durante o governo de Antonio Anastasia (PSDB). A auditoria da controladoria aponta que houve prejuízo de cerca de R$ 9,8 milhões aos cofres públicos.',
        imagem: 'https://s2.glbimg.com/p4NCQiAXFXoeui-Z3hLIuw6mdrM=/s.glbimg.com/jo/g1/f/original/2014/12/30/1891068_494430480679972_2000335663_n.jpg',
        dataPublicacao: 'Fri, 14 Feb 2020 13:44:49 -0000'
    },
];

export const { Context, Provider } = createDataContext(
    feedReducer,
    { addItem, deleteItem, fetchItems, restoreState, deleteAll },
    [] //rssItems
);
