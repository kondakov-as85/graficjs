var drawChart;

            var queueName = 'barsQueue';

            var currentDrawBarIndex = 0;

            var init = function(maxValue, Values) {    
                drawChart = new DrawChart(
                    {            
                        maxValue,                        
                        dashValues: Values
                    }
                );
                drawChart.drawPanel();
            };

            var DrawChart = function(options){    
                this.width = parseInt(options.maxValue);
                this.dashValues = options.dashValues;
                this.count = parseInt(this.dashValues.length) + 1;
                console.log('Count1: ', this.count);
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
                        containerBar.innerHTML = '<span class="bar"><span class="dash"></span></span>';
                        histogram.append(containerBar);
                        let ml = parseInt(this.dashValues[i-1].l);
                        drawDash(i, ml);
                    }
                };

                this.start = function() {        
                    startAnimationBar(1, this.width, this.dashValues);
                };

                this.stop = function() {
                 	let Value = $('.bar-container[data-id='+currentDrawBarIndex+'] .bar').css('width').replace('px', '');
				 	let result = {};
				 	result["BarNumber"] = currentDrawBarIndex;
				 	result["Value"] = Value;
                 	if (Value > 0) {
                 		stopAnimationBar(this.width, this.dashValues);
                 	}
				 	return result; 
                }
            };

            function drawDash(indexDash, ml) {
                if (ml) {
                    $('.bar-container[data-id='+(indexDash)+'] .dash').css('margin-left', ml+'px' );
                }
            }

            function startAnimationBar(indexBar, width, dashValues) { 
                count = parseInt(dashValues.length);     
                if(isAnimated(count)) {
                    return;
                } else {
                    if (indexBar < count+1) {
                        console.log('indexBar: ' + indexBar);
                        currentDrawBarIndex = indexBar;                                                  
                            $('.bar-container[data-id='+indexBar+'] .bar').css('width', '0px' )        
                                            .animate({width: width+'px'},                                    
                                                {
                                                    duration: dashValues[indexBar-1].d*1000,                                                                
                                                    easing: "linear",                            
                                                    complete: function(){ // функция будет выполнена после завершения анимации
                                                        startAnimationBar(indexBar + 1, width, dashValues)
                                                        $('.bar-container[data-id='+(indexBar + 1)+'] .bar').dequeue(queueName);
                                                    }
                                                });                        
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

            function stopAnimationBar(width, dashValues) {                
                $('.bar-container[data-id=' + currentDrawBarIndex + '] .bar').stop();
                startAnimationBar(currentDrawBarIndex + 1, width, dashValues);
            }
            
            function startBar() {
				drawChart.start();
			}
            function stopBar() {
				return drawChart.stop();
            }
            // function InitBar(paramString) {
                    // params = JSON.parse(paramString);
            function InitBar() {                
                let paramString = {
                    'maxValue': 500,
                    // 'durationValue': 2,
                    'Values': [
                        {l: 100, d: 0.1},
                        {l: 200, d: 3},
                        {l: 300, d: 0.4},
                        {l: 400, d: 2}
                    ]
                }                
                params = paramString;
				
				init(params.maxValue, params.Values);
			}