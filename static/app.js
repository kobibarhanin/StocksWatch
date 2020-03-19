var column_size = "five wide column";


$(document).ready(function () {
    set_stocks()
    set_add_button()
});


function generate_chart(stock, market){
    return `
        <div id="`+stock+`_chart" class="`+column_size+` wide column">    
            <h2>
                <a href="https://www.tradingview.com/symbols/`+market+`-`+stock+`/" rel="noopener" target="_blank">
                    <span class="blue-text">`+stock+`</span>
                </a> 
                <a href="#" id="`+stock+`_close_icon"> <i class="window close icon"></i></a>            
            </h2>
            <div class="tradingview-widget-container">
                <div id="tradingview_`+stock+`"></div>
                <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
                <script type="text/javascript">
                    new TradingView.widget(
                        {
                        "autosize": true,
                        "symbol": "`+market+`:`+stock+`",
                        "interval": "D",
                        "timezone": "Etc/UTC",
                        "theme": "dark",
                        "style": "3",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "hide_top_toolbar": true,
                        "hide_legend": true,
                        "save_image": false,
                        "container_id": "tradingview_`+stock+`"
                        }
                    );
                </script>
            </div>
        </div>
        `;
}


function remove_button(){
    symbol = $(this).attr('id').split("_")[0]
    $("#"+symbol+"_chart").remove();
    $.getJSON('/delete_stock',{'stock':symbol},function(res){});
}


function set_stocks(){
    $.getJSON('/get_stocks',{},function(stocks){
        $.each(stocks,function(index, stock){ 
            $("#chart_grid").append(generate_chart(stock['symbol'], stock['market']));
            $("#chart_grid").on('click', "#"+stock['symbol']+"_close_icon", remove_button);
        });
    });
}


function set_add_button(){
    $("#add_button").click(function(){
        symbol_to_add = $("#add_symbol").val()
        market_to_add = $("#add_market option:selected" ).text();

        $.getJSON('/add_new_stock',{'symbol':symbol_to_add,'market':market_to_add},function(res){
            if (res){
                $("#chart_grid").append(generate_chart(symbol_to_add, market_to_add));
                $("#chart_grid").on('click', "#"+symbol_to_add+"_close_icon", remove_button);
            }
            else{
                alert('Stock allready added!')
            }
        });
    });
}