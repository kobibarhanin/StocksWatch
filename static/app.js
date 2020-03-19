var column_size = "five wide column";

var stocks = [
    {
        symbol: "AAPL",
        market: "NASDAQ"
    },
    {
        symbol: "MSFT",
        market: "NASDAQ"
    },
    {
        symbol: "AMZN",
        market: "NASDAQ"
    },
    {
        symbol: "INTC",
        market: "NASDAQ"
    },
    {
        symbol: "BA",
        market: "NYSE"
    },
    {
        symbol: "NKE",
        market: "NYSE"
    },
    {
        symbol: "DIS",
        market: "NYSE"
    }
];

$(document).ready(function () {
    var symbols_line = ""
    for (stock of stocks) {
        $("#chart_grid").append(generate_chart(stock.symbol, stock.market));
        $("#chart_grid").on('click', "#"+stock.symbol+"_close_icon", remove_button);
    }

    $("#add_button").click(function(){
        symbol_to_add = $("#add_symbol").val()
        market_to_add = $("#add_market option:selected" ).text();
        if (add_stock(symbol_to_add, market_to_add)){
            $("#chart_grid").append(generate_chart(symbol_to_add, market_to_add));
            $("#chart_grid").on('click', "#"+symbol_to_add+"_close_icon", remove_button);
        }
        else{
            alert('Stock allready added!')
        }
    });
});


function generate_chart(stock, market){

    var chart = `
        <div id="`+stock+`_chart" class="`+column_size+` wide column">    
            <h2>`+stock+`
                <a href="#" id="`+stock+`_close_icon"> <i class="window close icon"></i></a>            
            </h2>
            <div class="tradingview-widget-container">
                <div id="tradingview_`+stock+`"></div>
                <div class="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/symbols/`+market+`-`+stock+`/" rel="noopener" target="_blank">
                <span class="blue-text">`+stock+` Chart</span></a> 
                </div>
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
    return chart
}

function add_stock(symbol, market){
    for (stock of stocks) {
        if (stock.symbol == symbol){
            return false
        }
    }
    stocks.push({
        symbol: symbol,
        market: market
    })
    return true
}

function del_stock(symbol){
    console.log('attempting delete: ' + symbol)
    for (i = 0; i < stocks.length; i++) {
        console.log(symbol)
        if (stocks[i].symbol == symbol){
            console.log('deleting: ' + symbol)
            stocks.splice(i, 1);
            return true
        }
    }
    return false
}

function remove_button(){
    symbol = $(this).attr('id').split("_")[0]
    $("#"+symbol+"_chart").remove();
    del_stock(symbol);
}