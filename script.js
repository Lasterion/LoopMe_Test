
// ожидание подгрузки всех картинок
window.onload = function(){
	
	var main_container = document.getElementById("main_container"),
		twister = document.getElementById("twister"),
		range = document.getElementById("range"),	
		sprite = document.getElementById("sprite"),	
		lightborder = document.getElementById("lightborder"),	
		iframe = document.getElementById("iframe"),		
		under_the_lid = document.querySelector("#sprite+div"),
		flash = document.querySelector("#flashing_memory_card>div"),	
		buy_now = document.getElementById("buy_now"),
		drag_now = document.getElementById("drag_now"),
		taglines = document.getElementById("taglines"),
		flash_camera = document.getElementById("flash_camera"),
		close_add = document.getElementById("close_add"),
		rain = document.getElementById("rain"),
		spans = taglines.children,
		flash_timer = 0,
		limit = 0,
		timer,
		timer_1;

	// Функция необходимых действий после прогрузки контента
	function afterLoad(){
		iframe.style.display = 'block';
		twister.style.display = 'block';
		twister.style.animation = "twister 1s cubic-bezier(0.0, 0.5, 0.5 ,1.0) 1";
		setTimeout(function(){
			drag_now.style.display = 'block';
			drag_now.style.animation = "emersion 1s linear 1";
		},1000);
		setTimeout(function(){
			buy_now.style.display = 'block';
			buy_now.style.animation = 'emersion 1s linear 1';
		},2000);
	};
	
	// Функция для выключения рекламы
	function getClose(){
		main_container.style.display = 'none';
	}

	// Функция для ползунка: вращения телефона + видео
	function getRotate() {
		let value=event.target.value;
		sprite.style.backgroundPosition = 'left ' + 221*(value-60) +'px';	
		if (value==60){
			lightborder.style.display = 'block';
			iframe.style.display = 'block';
		}
		else{
			lightborder.style.display = 'none';
			iframe.style.display = 'none';
		}	
	}

	// // Функция для вида под кришкой + блик карты памяти, примечание:
	// столкнулся c тем, что в css не сработало свойсвто animation-delay,
	// потому реализовал через setTimeout
	function getUnderLid(){
		let value=event.target.value;
		if (value==1){
			sprite.style.backgroundPosition = 'left -12818px';
			under_the_lid.classList.add("emersion");	
			setTimeout(function(){flash.style.display = 'block';},1000);
		}
		else{
			under_the_lid.classList.remove("emersion");
			flash.style.display = 'none';
		}
	}

	// Функция для появления рекламных слоганов
	function getTaglines(){
		let value=event.target.value,
		 	number;
		if(value<=15){
			number = 3;
		}
		else if (value>15 && value<=39){
			number = 2
		}
		else if(value>39 && value<57){
			number = 1
		}
		else{
			number = 0
		}
		for(var i = 0; i < spans.length; i++){
			if(i == number){
				spans[i].style.display = 'inline';
				spans[i].style.animation = 'emersion 1s ease-out 1';
			}
			else{
				spans[i].style.display = 'none';
			}
		}
	}

	// Функция для вспышки камеры 
	function getFlash(){
		let value=event.target.value;
		if (value>=29 && value<=31 && flash_timer==0){
			flash_camera.style.display = 'block';
			flash_timer=1;
			setTimeout(function(){
				flash_camera.style.display = '';
				flash_timer = 0;
			},350);
		}
	}

	// Функция-генератор целых чисел в диапазоне min - max, включительно
	function getRandomInt(min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
	}

	// Функция для отрисовки капли
	function renderRainDrop(){
		let koeff = (Math.random()+0.1), // коэф размера капли от базового
			dropclass = getRandomInt(1,4), // класс для выбора капельки
			div = document.createElement('div'), //DOM оболочка капли
			width,
			height;

		rain.appendChild(div);
		div.classList.add('dropclass');
		div.classList.add(`dropclass${dropclass}`);
		width = parseInt(parseInt(window.getComputedStyle(div,null).width)*koeff);
		height = parseInt(parseInt(window.getComputedStyle(div,null).height)*koeff);
		div.style.width = width + 'px';
		div.style.height = height + 'px';
		div.style.left = getRandomInt(0,950) + 'px';
		div.style.top = getRandomInt(0,240) + 'px';
	}

	// Функция-обработчик для отрисовки дождя в целом
	function getRain(){
		let value=event.target.value;
		if (value>=40 && value<=57 && limit == 0){
			limit = 1;
			timer = setInterval(renderRainDrop,65);
			timer_1 = setTimeout(function() {
  				clearInterval(timer);
  				limit = 0;
			}, 10000);
		}
		else if(value<=40 || value>=57){
			clearInterval(timer);
			rain.innerHTML =''; // чистка блока, без этого зависает, у вас таже проблема
			limit = 0;
		}
	}

	// Запуск стартовых действий
	afterLoad();

	// Подписка на кнопку выключения
	close_add.addEventListener("click", getClose, false);

	// Подписка ползунка на событие input 
	range.addEventListener("input" ,getRotate,false);
	range.addEventListener("input" ,getTaglines,false);
	range.addEventListener("input" ,getUnderLid,false);
	range.addEventListener("input" ,getFlash,false);
	range.addEventListener("input" ,getRain,false);
}