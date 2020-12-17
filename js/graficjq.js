var drawChart;

var queueName = 'barsQueue';

var currentDrawBarIndex = 0;

var init = function() {    
    var maxValue = document.getElementById("maxValue").value;
    var durationValue = document.getElementById("durationValue").value;
    
    drawChart = new DrawChart(
        {            
            maxValue,
            duration: durationValue,
            dashValues: [480, 450, 430, 400, 380]
        }
    );
    drawChart.drawPanel();
};

var DrawChart = function(options){    
    this.width = parseInt(options.maxValue);
    this.dashValues = options.dashValues;
    this.count = parseInt(this.dashValues.length) + 1;
    console.log(this.count);
    this.duration = options.duration*1000;

    this.drawPanel = function() {
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
            containerBar.innerHTML = '<span class="bar-label"> ' + i + ' </span><span class="bar"><span class="dash"></span></span><span class="bar-number"></span>';
            histogram.append(containerBar);
            let ml = parseInt(this.dashValues[i-1]);
            drawDash(i, ml);
        }
    };

    this.start = function() {        
        startAnimationBar(1, this.width, this.duration, this.count);        
    };

    this.stop = function() {
        stopAnimationBar(this.width, this.duration, this.count);
    }
};

function drawDash(indexDash, ml) {
    if (ml) {
        $('.bar-container[data-id='+(indexDash)+'] .dash').css('margin-left', ml+'px' );
    }
}

function startAnimationBar(indexBar, width, duration, count) {      
    if(isAnimated(count)) {
        return;
    } else {
        if (indexBar < count) {
            console.log('indexBar: ' + indexBar);
            currentDrawBarIndex = indexBar;
            printLastValue("-1");   
            if (indexBar < count) {
                $('.bar-container[data-id='+indexBar+'] .bar').css('width', '0px' )        
                                .animate({width: width+'px'}, 
                                    {
                                        duration,
                                        complete: function(){ // функция будет выполнена после завершения анимации
                                            printLastValue();
                                            startAnimationBar(indexBar + 1, width, duration, count)
                                            $('.bar-container[data-id='+(indexBar + 1)+'] .bar').dequeue(queueName);
                                        }
                                    });
            }
        }
    }
}

function isAnimated(count) {
    for(var i = 1; i < count; i++) {
        if ($('.bar-container[data-id=' + currentDrawBarIndex + '] .bar').is( ":animated" )) {
            return true;
        }
    }
    return false;
}

function stopAnimationBar(width, duration, count) {
    printLastValue();
    $('.bar-container[data-id=' + currentDrawBarIndex + '] .bar').stop();
    startAnimationBar(currentDrawBarIndex + 1, width, duration, count);
}

function printLastValue(val) {
    let lastValue = $('.bar-container[data-id='+currentDrawBarIndex+'] .bar').css('width').replace('px', '');
    console.log('lastValue: ', lastValue)
    if (val=="-1")
        $('.bar-container[data-id='+currentDrawBarIndex+'] .bar-number').html("");
    else
        $('.bar-container[data-id='+currentDrawBarIndex+'] .bar-number').html(lastValue);
}