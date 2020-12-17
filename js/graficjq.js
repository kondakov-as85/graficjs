var drawChart;

var init = function() {
    var countDiagrams = document.getElementById("countDiagrams").value;
    var maxValue = document.getElementById("maxValue").value;
    
    drawChart = new DrawChart(
        {
            countDiagrams,
            maxValue,
            dashValues: [480, 450, 430, 400, 380]
        }
    );
    drawChart.draw();
};

var DrawChart = function(options){

    this.count = parseInt(options.countDiagrams)+1;
    this.width = parseInt(options.maxValue);
    this.dashValues = options.dashValues;

    this.draw = function() {
        var histogram = document.getElementsByClassName("histogram")[0];
        // Чистим поле диаграмм
        histogram.innerHTML='';
        // Задаем ширину для диаграмм
        $('.histogram').css('width', this.width+'px' );        
        // Рисуем поля для графиков и метки
        for(var i = 1; i < this.count; i++) {
            let containerBar = document.createElement("div");
            containerBar.setAttribute("class", "bar-container");
            containerBar.setAttribute("data-id", i);
            containerBar.innerHTML = '<span class="bar-label"> '+i+' </span><span class="bar"><span class="dash"></span></span><span class="bar-number"></span>';                       
            histogram.append(containerBar);
            let ml = parseInt(this.dashValues[i-1]);
            if (ml) {
                $('.bar-container[data-id='+(i)+'] .dash').css('margin-left', ml+'px' );
            } 
        }
    };

    this.start = function() {
        // Рисуем бары
        for ( var i = 0; i < this.count; i++ ) {            
            $('.bar-container[data-id='+(i+1)+'] .bar').css('width', this.width+'px' );              
        }
    };
};
