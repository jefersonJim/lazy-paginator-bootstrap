/////////////////////////////////////////////////////////////////////
/********************************************************************
//@AUTOR: JEFERSON INACIO MACEDO									#
//@DATA DA CRIAÇÂO: 21/02/2017										#
//@DATA DA ULTIMA ATUALIZAÇÃO: 	    								#
//DESCRIÇÃO: PLUGIN CRIADO PARA PAGINÇÃO DE TABLE DE ACORDO COM O   #
//		     NÚMERO DE REGISTRO 	                    			#
//===================================================================
*////////////////////////////////////////////////////////////////////
(function($){
	function LazyPaginator(element, options){
		this.config = {
			rows: 10,
			rangeButton:5,
			ajax:"",
			parametros: {},
			renderLine : function(data, numberLine){},
			renderEmpty : function(){},
			complete : function(){}
		};
		$.extend(this.config, options);
		//PEGANDO OBJETO
		this.objTable = $(element);
		
		//RENDERIZANDO BOTÕES
		this.renderButton = function(page, count ){
			var obj = this;
			var pageNumber = ((page - this.config.rangeButton) <= 0 ? (page - (page-1) ) : (page - this.config.rangeButton) );
			var last_page = ( (count%this.config.rows) > 0 ? parseInt(count/this.config.rows)+1 : parseInt(count/this.config.rows) ) ;
			var offset_btn = (pageNumber-1) * this.config.rows;
			var iterable = 0;


			var buttons_div = $(`<div class="btn-toolbar " role="toolbar" aria-label="paginator"> 
									<div class='pull-left'>
									   <strong>`+count+`</strong> registro(s) / P\u00e1gina <strong>`+page+`</strong> de <strong>`+last_page+`</strong>
									</div>
									<div id="_buttons_" class="btn-group pull-right" role="group" aria-label="buttons">
									</div>
							    </div>`);

			var _local_buttons = buttons_div.find("#_buttons_");

			if(pageNumber != 1){
				var btn_first = $(`<button type="button" class="btn btn-default"> <span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span></button>`);
				var btn_prev = $(`<button type="button" class="btn btn-default "> <span class="glyphicon glyphicon-backward" aria-hidden="true"></span></button> `);
				btn_first.click(function(){
					obj.updateLine(1);
				});
				btn_prev.click(function(){
					obj.updateLine((page-1));
				});
				_local_buttons.append(btn_first);
				_local_buttons.append(btn_prev);
			}

			for (var i = offset_btn; i <= count; i++) {
				iterable++;
				if( (iterable == this.config.rows) || (iterable < this.config.rows && i == count) ) {
					var btn = $(` <button type="button" data-page="`+pageNumber+`" class="btn btn-default `+(pageNumber == page ? "active" : "")+` "> `+pageNumber+`</button> `);
					btn.click(function(){
						obj.updateLine($(this).data("page"));
					});
					_local_buttons.append(btn);

					if( pageNumber == (page +  this.config.rangeButton) ){
						break;
					}
					pageNumber++;
					iterable = 0;
				}
			};
			

			if( page < (count/this.config.rows) ){
				var btn_next = $(` <button type="button" class="btn btn-default  "> <span class="glyphicon glyphicon-forward" aria-hidden="true"></span></button> `);
				var btn_last = $(` <button type="button" class="btn btn-default  " > <span class="glyphicon glyphicon-fast-forward" aria-hidden="true"></span></button> `);
				btn_next.click(function(){
					obj.updateLine((page+1));
				});
				btn_last.click(function(){
					obj.updateLine(last_page);
				});
				_local_buttons.append(btn_next);
				_local_buttons.append(btn_last);
			}
			var colspan = this.objTable.find("tbody tr:last-child td").length;
			this.objTable.find("tbody").append(` <tr> <td colspan="`+colspan+`"> </td> </tr>`).find("tr:last-child td").append(buttons_div);
		};

		this.updateLine = function(page){

			var offset = (page-1) * this.config.rows;
			var dados = {offset: offset , limit: this.config.rows }
			dados = $.extend( dados, this.config.parametros );
			var obj = this;

			$.ajax({
				url: this.config.ajax,
				type:"GET",
				dataType:"json",
				data : dados,
				success : function(json){
					var line = "";
					if(json.resultado.length > 0){
						$.each(json.resultado, function(key,value){
							line += "<tr>"
							line += obj.config.renderLine(value, key+1);
							line += "</tr>"
						});
					}else{
						line += "<tr>"
						line += obj.config.renderEmpty();
						line += "</tr>"
					}
					obj.objTable.find("tbody").html(line);
					obj.renderButton(page, json.total);
					obj.config.complete();
				}
			});
		}

		this.init = function(){
			this.updateLine(1);
		}
		this.init();
	}

	$.fn.lazyPaginator = function(options){
		return this.each(function(){			
			var element = $(this);
			var lazyPaginator = new LazyPaginator(this, options);
			element.data('lazyPaginator', lazyPaginator);	
		});
	};	
})($);