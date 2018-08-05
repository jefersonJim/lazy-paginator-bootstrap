# Jim plugin lazy-paginator-bootstrap

https://jefersonjim.github.io/lazy-paginator-bootstrap/

Paginação Lazy Loading utilizando recursos do jquery e bootstrap que
permite programar o "table" para trabalhar de forma “preguiçosa”, ou seja, buscando apenas os registros que precisam ser exibidos na 
página atual.

Exemplo simples:

    $("#table_exemplo").lazyPaginator({
      ajax:"exemplo_paginator.php",
      renderLine:function(data, nr_linha){
        line  = `<td style="text-align:center;"> `+data.id+` </td>`;
        line += `<td style="text-align:center;"> `+data.exemplo+` </td>`;
        line += `<td> `+data.info+` </td>`;
        return line;
      }
    });

# Propriedades
   <strong>Ajax</strong> : String  <br> Url para request para consumir os dados <br>
          Exemplo de retorno do request :
              
           {
             total:100,
             restultado: [{
                           id:1,
                           nome : "Exemplo",
                           info : "exemplo"
                         }]
           }
                 
      
   <strong>renderLine</strong> : Function(data, nr_line) <br>
        Função utilizada para renderizar o conteudo da linha da table<br>
        
           data: objeto
           nr_line: número da linha
         
    
   <strong>rows</strong>:int Limit de linhas a ser exibidas
    
   <strong>rangeButton</strong>:int Range de Botões de paginação que será mostrado
    
   <strong>parametros</strong> :JSON  Parâmetros adicionais  que serão enviados para o backEnd como GET
    
   <strong>renderEmpty</strong>: Function <br>Função que renderiza Linha quando a request não possui dados
    
   <strong>complete</strong>: Function <br>Função chamada após a renderização das linhas e botões de paginação
      
