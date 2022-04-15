

//Настройки Gulp - проверка поддержки webp, добавление класса webp или no-webp для HTML

//Проверка поддержки webp
function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
//Добавление класса webp или no-webp для HTML
testWebP(function (support) {
	let className = support === true ? 'webp' : 'no-webp';
	document.documentElement.classList.add(className);
});

/*основной код==============================================================*/

//функция определения мобильного устройства===================
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android()
			|| isMobile.BlackBerry()
			|| isMobile.iOS()
			|| isMobile.Opera()
			|| isMobile.Windows()
		);
	}
};

//включение hover кнопки "add note" на ПК версии

if (!isMobile.any()) {
	let addNoteButton = document.querySelector('.header-page__button');
	addNoteButton.classList.add('hover-button');
};

//открытие и закрытие окна для ввода заметки

let hoverButton = document.querySelector('.header-page__button');
let noteWindow = document.querySelector('.page__note-window');
let windowClose = document.querySelector('.input-window__close');

hoverButton.addEventListener("click", function () {
	noteWindow.classList.add('active');
});

windowClose.addEventListener("click", function () {
	noteWindow.classList.remove('active');
});

//добавление стикера с заметкой на страницу

let formForNote = document.forms[0];
let textInput = formForNote.textarea;

textInput.addEventListener("keydown", function () {
	if (event.key === 'Enter') {
		//создаем стикер на странице, переносим в него введенный пользователем текст 
		let sticker = document.createElement('div');
		let stickerArea = document.querySelector('.sticker-area');
		stickerArea.append(sticker);
		sticker.classList.add('sticker-area__sticker');
		sticker.innerHTML = textInput.value;
		textInput.value = ""; //очищаем input после выведения 

		//задаем рандомное значение угла наклона для стикера в диапазоне от -9 до 9 градусов
		sticker.style.transform = `rotate(${(Math.random() * 10) - (Math.random() * 10)}deg)`;

		//задаем рандомный цвет из установленного диапазона
		let randomNumberForColor = Math.random() * 10;
		if (randomNumberForColor <= 2) {
			sticker.style.backgroundColor = "#d417d1";
		} else if ((2 < randomNumberForColor) && (randomNumberForColor <= 4)) {
			sticker.style.backgroundColor = "#0af5e9";
		} else if ((4 < randomNumberForColor) && (randomNumberForColor <= 6)) {
			sticker.style.backgroundColor = "#e5f50a";
		} else if ((6 < randomNumberForColor) && (randomNumberForColor <= 8)) {
			sticker.style.backgroundColor = "#0af53d";
		} else {
			sticker.style.backgroundColor = "#d49217";
		};

		//удаление стикера
		let stickersOnPage = document.querySelectorAll('.sticker-area__sticker');
		for (let i = 0; i < stickersOnPage.length; i++) {
			stickersOnPage[i].addEventListener("click", function () {
				stickersOnPage[i].remove();
			});
		};

	}
})



