var drawChart;

var init = function() {
    var countDiagrams = document.getElementById("countDiagrams").value;
    var maxValue = document.getElementById("maxValue").value;
    
    drawChart = new DrawChart(
        {
            countDiagrams,
            maxValue,
            dashValues: [10, 15, 34, 48, 24]
        }
    );
    drawChart.draw();
};

var DrawChart = function(options){
    this.draw = function() {
        var histogram = document.getElementsByClassName("histogram")[0];
        

        histogram.innerHTML='';
        
        var control = document.createElement("div");
        var formControl = document.createElement("form");
        control.append(formControl);
        
        let count = parseInt(options.countDiagrams)+1;
        let width = parseInt(options.maxValue);

        // histogram.css('histogram', width+'px');
        $('.histogram').css('width', width+'px' );

        for(var i = 1; i < count; i++) {
            let itemControl = document.createElement("div");
            itemControl.innerHTML = "<label>"+i+": </label>";
            let inputItem = document.createElement("input");
            inputItem.setAttribute("type", "text");
            inputItem.setAttribute("class", "reviews_"+i+"star");
            itemControl.append(inputItem);
            formControl.append(itemControl);
        }        
        histogram.append(control);
        for(var i = 1; i < count; i++) {
            let containerBar = document.createElement("div");
            containerBar.setAttribute("class", "bar-container");
            containerBar.setAttribute("data-id", i);
            containerBar.innerHTML = '<span class="bar-label"> '+i+' </span><span class="bar"><span class="dash"></span></span><span class="bar-number"></span>';
            let ml = parseInt(options.dashValues[i-1]);
            if (ml) {
                $('.bar-container[data-id='+(i)+'] .dash').css('margin-left', ml+'px' );
            }            
            histogram.append(containerBar);
        }
    };
    this.start = function() {
        var stars = new Array();
        var sum = 0;
        var width = new Array();

        let count = parseInt(options.countDiagrams)+1;
        let maxValue = parseInt(options.maxValue);
        
        // Считываем значения
        for ( var i = 1; i < count; i++ ) {
            // stars.push(parseInt($('.reviews_'+i+'star').val()));
            stars.push(maxValue);
        }     
        // Считаем сумму 
        for ( var i = 0; i < stars.length; i++ ) {
            sum += stars[i];       
        }     
        // Расчитываем проценты для графика
        // Выставляем ширину в процентах
        sum = maxValue; 
        for ( var i = 0; i < stars.length; i++ ) {
            w = ((stars[i]) / sum * 100).toFixed(0);        
            width.push(w);
            $('.bar-container[data-id='+(i+1)+'] .bar').css('width', maxValue+'px' );
        }
        // Подставляем значения в лейблы
        // if (sum > 0) {
        // for ( var i = 0; i < stars.length; i++ ) {
        //     // $('.bar-container[data-id='+(i+1)+'] .bar-number').html(width[i]+'%'); 
        //     $('.bar-container[data-id='+(i+1)+'] .bar-number').html(width[i]); 
        // }
        // } else{
        // $(".bar-container .bar-number").html('0%')
        // }
    };
};
